const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const express = require("express");
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  githubCallbackUrl,
} = require("../config");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: githubCallbackUrl,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        let user = await User.findOne({
          $or: [
            { externalAccountId: profile.id },
            { username: profile?.username },
            {
              email: profile._json?.email?.find((emailObj) => emailObj?.primary)
                ?.email,
            },
          ],
        });

        if (!user) {
          user = new User({
            username: profile?.username,
            email:
              profile._json?.email?.find((emailObj) => emailObj?.primary)
                ?.email ?? "",
            profilePictureUrl: profile?.photos[0]?.value,
            bio: profile?.bio ?? "",
            isAdmin: false,
            externalAccountId: profile?.id,
          });
          await user.save();
        } else {
          console.log("Github user already exist in DB.");
        }
        const token = jwt.sign(
          { id: user._id, provider: user.isAdmin },
          JWT_SECRET,
          { expiresIn: "3d" }
        );
        profile.token = token;
        return cb(null, profile);
      } catch (error) {
        console.log("Error in github authentication", error);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});
passport.deserializeUser((user, callback) => {
  callback(null, user);
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/auth/login/github/error",
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect("/api/auth/login/github/success");
  }
);

router.get("/github/success", async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.username,
    provider: req.session.passport.user.provider,
    token: req.session.passport.user.token,
  };
  res
    .status(200)
    .json({ message: "Github authentication successful", user: userInfo });
});

router.get("/error", (req, res) => res.send("Error logging in via Github.."));

module.exports = router;

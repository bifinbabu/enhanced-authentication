const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./routes/swaggerConfig");

const passport = require("passport");
const expressSession = require("express-session");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const {
  // GOOGLE_CLIENT_ID,
  // GOOGLE_CLIENT_SECRET,
  MONGO_URL,
  CSS_URL,
  deploymentURL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = require("./config");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/", async (req, res) => {
  res.send("Welcome to Enhanced Authentication.");
});

// ---------------------------------------------------------

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/github/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
      // const user = await User.findOne({
      //   accountId: profile.id,
      //   provider: "github",
      // });
      // if (!user) {
      //   console.log("Adding new github user to DB..");
      //   const user = new User({
      //     accountId: profile.id,
      //     name: profile.username,
      //     provider: profile.provider,
      //   });
      //   await user.save();
      //   // console.log(user);
      //   return cb(null, profile);
      // } else {
      //   console.log("Github user already exist in DB..");
      //   // console.log(profile);
      //   return cb(null, profile);
      // }
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

app.use(
  expressSession({
    secret: "passport_google",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/api/auth/login/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/github/error" }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect("/github/success");
  }
);

app.get("/github/success", async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.username,
    provider: req.session.passport.user.provider,
  };
  res
    .status(200)
    .json({ message: "Github authentication successful", user: userInfo });
});

app.get("/error", (req, res) => res.send("Error logging in via Github.."));

// ---------------------------------------------------------

// Swagger setup
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

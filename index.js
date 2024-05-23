const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./routes/swaggerConfig");

const passport = require("passport");
const expressSession = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URL,
  CSS_URL,
  deploymentURL,
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

// --------------------Start Google auth -------------------------

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/callback",
    },
    (accessToken, refreshToken, profile, callback) => {
      callback(null, profile);
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

// Routes
app.get(
  "/api/auth/login/google",
  (req, res, next) => {
    // Add data to the request object
    req.clientUrl = "Hello from /login/google!";
    // Continue with the authentication process
    next();
  },
  passport.authenticate("google", { scope: ["profile email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.redirect("http://localhost:8000/google/callback");
      // res.redirect(`${deploymentURL}/google/callback`);
    } else {
      res.send("Google auth failed");
    }
  }
);

// --------------------End Google auth -------------------------

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

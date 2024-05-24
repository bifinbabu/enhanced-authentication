const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./routes/swaggerConfig");

const passport = require("passport");
const expressSession = require("express-session");

const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const githubRoute = require("./routes/githubAuth");

const { MONGO_URL, CSS_URL } = require("./config");

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

app.use(
  expressSession({
    secret: "passport",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

// Routes
app.use("/api/auth", authRoute);
app.use("/api/auth/login", githubRoute);
app.use("/api/users", userRoute);

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

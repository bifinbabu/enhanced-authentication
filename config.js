// // START: DEV
// const GITHUB_CLIENT_ID = "Ov23likeujPzsF0jz0Hy";
// const GITHUB_CLIENT_SECRET = "b99d8419e71f8ad99d950f22bd62a0681d02ddcc";
// const githubCallbackUrl =
//   "http://localhost:8000/api/auth/login/github/callback";
// const baseUrl = "http://localhost:8000/";
// // END: DEV
// START: PROD
const GITHUB_CLIENT_ID = "Ov23liKAoYD7ERQaH14l";
const GITHUB_CLIENT_SECRET = "9e4b8e788cf6516b741c49a995d15c559458b7c4";
const githubCallbackUrl =
  "https://enhanced-authentication.vercel.app/api/auth/login/github/callback";
const baseUrl = "https://enhanced-authentication.vercel.app/";
// END: PROD

const MONGO_URL =
  "mongodb://user:SM2xURpnJduBEExI@ac-uynjg2u-shard-00-00.tqaeshh.mongodb.net:27017,ac-uynjg2u-shard-00-01.tqaeshh.mongodb.net:27017,ac-uynjg2u-shard-00-02.tqaeshh.mongodb.net:27017/spree?ssl=true&replicaSet=atlas-zrwf38-shard-0&authSource=admin&retryWrites=true&w=majority";
const PORT = 8000;

const PASSWORD_SECRET = "bifin";
const JWT_SECRET = "bifin";

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

module.exports = {
  MONGO_URL,
  PORT,
  PASSWORD_SECRET,
  JWT_SECRET,
  baseUrl,
  CSS_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  githubCallbackUrl,
};

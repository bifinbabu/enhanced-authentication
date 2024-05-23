const GOOGLE_CLIENT_ID =
  // "1007041666375-pqg8js7fgq8cq5md36jqtmetqhcqt9v5.apps.googleusercontent.com";
  "365827126133-aukqqeam0m5lqh30v8ppsghuremgfmh8.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_CLIENT_SECRET = "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";

const MONGO_URL =
  "mongodb://user:SM2xURpnJduBEExI@ac-uynjg2u-shard-00-00.tqaeshh.mongodb.net:27017,ac-uynjg2u-shard-00-01.tqaeshh.mongodb.net:27017,ac-uynjg2u-shard-00-02.tqaeshh.mongodb.net:27017/spree?ssl=true&replicaSet=atlas-zrwf38-shard-0&authSource=admin&retryWrites=true&w=majority";
const PORT = 8000;

const PASSWORD_SECRET = "bifin";
const JWT_SECRET = "bifin";

const deploymentURL = "https://enhanced-authentication.vercel.app/";

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URL,
  PORT,
  PASSWORD_SECRET,
  JWT_SECRET,
  deploymentURL,
  CSS_URL,
};

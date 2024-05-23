const swaggerJSDoc = require("swagger-jsdoc");
const { deploymentURL } = require("../config");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Private / Public User Authentication API",
      version: "1.0.0",
      description: "Private / Public User Authentication API",
    },
    servers: [
      {
        // url: "http://localhost:8000",
        url: deploymentURL,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

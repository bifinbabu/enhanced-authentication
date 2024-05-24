const swaggerJSDoc = require("swagger-jsdoc");
const { baseUrl } = require("../config");

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
        url: baseUrl,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

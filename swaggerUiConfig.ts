export const swaggerUiOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant api ",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:5500",
      },
    ],
  },
  apis: ["./dist/routes/*.js"],
};

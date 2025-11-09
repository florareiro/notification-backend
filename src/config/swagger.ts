import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Notificações",
        version: "1.0.0",
        description:
          "Documentação da API RESTful para gerenciamento de notificações de usuários.",
      },
      servers: [
        {
          url: "http://localhost:4000/api",
          description: "Servidor local",
        },
      ],
    },
    apis: ["./src/routes/*.ts"], // Caminho dos arquivos onde ficam as rotas
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

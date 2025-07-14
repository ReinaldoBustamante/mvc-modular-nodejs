import express, { Router } from "express";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import swaggerUI from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser"; // Importa SwaggerParser

export class AppServer {
  constructor(
    public port: number,
    public routes: Router,
  ) {}

  public async start() {
    // Cambia a async para usar await
    const app = express();

    let swaggerDocument;
    try {
      swaggerDocument = await SwaggerParser.bundle("./docs/swagger.yaml");
    } catch (err) {
      console.error("Error al parsear o bundlear Swagger/OpenAPI:", err);
      process.exit(1);
    }

    app.use(express.json());
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); // Pasa el documento ya resuelto
    app.use("/api", this.routes);
    app.use(ErrorMiddleware.errorHandler);

    app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`),
    );
  }
}

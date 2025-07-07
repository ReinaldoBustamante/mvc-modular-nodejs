import express, { Router } from "express";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import swaggerUI from 'swagger-ui-express';
import fs from 'fs'
import YAML from 'yaml'

export class AppServer {
  constructor(
    public port: number,
    public routes: Router,
  ) {}

  public start() {
    const app = express();
    const file = fs.readFileSync('./docs/swagger.yaml', 'utf-8');
    const swaggerDocument = YAML.parse(file);

    app.use(express.json());
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    app.use("/api", this.routes);
    app.use(ErrorMiddleware.errorHandler);

    app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`),
    );
  }
}

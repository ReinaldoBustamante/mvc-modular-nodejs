import express, { Router } from "express";

export class AppServer {
  constructor(
    public port: number,
    public routes: Router,
  ) {}

  public start() {
    const app = express();
    app.use(express.json());
    app.use("/api", this.routes);
    app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`),
    );
  }
}

import { Router } from "express";
import { AuthRouter } from "./modules";

export class AppRouter {
  public static router(): Router {
    const router = Router();
    router.use("/auth", AuthRouter.router());
    return router;
  }
}

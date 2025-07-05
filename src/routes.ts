import { AuthRouter } from "./modules";
import { Router } from "express";

export class AppRouter {
  public static router(): Router {
    const router = Router();
    router.use("/auth", AuthRouter.router());
    return router;
  }
}

import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRouter {
  public static router() {
    const router = Router();
    const authController = new AuthController();

    router.get("/", authController.getUsers);
    return router;
  }
}

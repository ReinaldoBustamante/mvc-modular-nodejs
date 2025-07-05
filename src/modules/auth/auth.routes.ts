import { AuthController, AuthService, AuthModel } from ".";
import { Router } from "express";

export class AuthRouter {
  public static router(): Router {
    const router = Router();
    const authModel = new AuthModel();
    const authService = new AuthService(authModel);
    const authController = new AuthController(authService);

    router.post("/register", authController.registerUser);

    return router;
  }
}

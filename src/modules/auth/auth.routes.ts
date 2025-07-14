import { AuthController, AuthService, AuthModel } from ".";
import { Router } from "express";
import { registerSchema, loginSchema } from "./schemas";
import { ValidateMiddleware } from "../../middlewares";

export class AuthRouter {
  public static router(): Router {
    const router = Router();
    const authModel = new AuthModel();
    const authService = new AuthService(authModel);
    const authController = new AuthController(authService);

    router.post(
      "/register",
      ValidateMiddleware.validate(registerSchema),
      authController.registerUser,
    );

    router.post(
      "/login",
      ValidateMiddleware.validate(loginSchema),
      authController.loginUser,
    );

    return router;
  }
}

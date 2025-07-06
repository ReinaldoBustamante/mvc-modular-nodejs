import { AuthController, AuthService, AuthModel } from ".";
import { Router } from "express";
import { registerSchema } from "./schemas/register.schema";
import { ValidateMiddleware } from "../../middlewares/validate.middleware";
import { loginSchema } from "./schemas/login.schema";

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

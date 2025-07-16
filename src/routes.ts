import { AuthRouter } from "./modules";
import { Router } from "express";
import { CategoriesRouter } from "./modules/category/category.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

export class AppRouter {
  public static router(): Router {
    const router = Router();
    router.use("/auth", AuthRouter.router());
    router.use(
      "/categories",
      authMiddleware.validateJWT,
      CategoriesRouter.router(),
    );
    return router;
  }
}

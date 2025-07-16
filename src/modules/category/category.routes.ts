import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryModel } from "./category.model";
import { ValidateMiddleware } from "../../middlewares";
import { categorySchema } from "./schemas/categorySchema";

export class CategoriesRouter {
  public static router() {
    const router = Router();
    const categoryModel = new CategoryModel();
    const categoryService = new CategoryService(categoryModel);
    const categoryController = new CategoryController(categoryService);

    router.get("/", categoryController.getCategory);
    router.post("/", ValidateMiddleware.validate(categorySchema), categoryController.createCategory);
    router.put("/:id", ValidateMiddleware.validate(categorySchema), categoryController.updateCategory);
    router.delete("/:id", categoryController.deleteCategory);
    return router;
  }
}

import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { CategoriesModel } from "./categories.model";

export class CategoriesRouter {
  public static router() {
    const router = Router();
    const categoriesModel = new CategoriesModel();
    const categoriesService = new CategoriesService(categoriesModel);
    const categoriesController = new CategoriesController(categoriesService);

    router.get("/", categoriesController.getCategories);
    router.post("/", categoriesController.createCategory);
    router.put("/:id", categoriesController.updateCategory);
    router.delete("/:id", categoriesController.deleteCategory);
    return router;
  }
}

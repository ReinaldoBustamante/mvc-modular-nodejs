import { Response, Request, NextFunction } from "express";
import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { CategoryService } from "./category.service";
import { CustomError } from "../../errors/CustomError";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  public getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userId = (req as any).user.id;
    try {
      if (!userId)
        throw CustomError.unauthorized(
          "is necesary an user to realize this action",
        );
      const categories = await this.categoryService.get(userId);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const createCategoryDto = new CreateCategoryDto(req.body);
    const userId = (req as any).user.id;
    try {
      if (!userId)
        throw CustomError.unauthorized(
          "is necesary an user to realize this action",
        );
      const categoryCreated = await this.categoryService.create(
        createCategoryDto,
        userId,
      );
      res.json(categoryCreated);
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const id = +req.params.id;
    const userId = (req as any).user.id;
    const updateCategoryDto = new UpdateCategoryDto(req.body);
    try {
      if (isNaN(userId)) throw CustomError.badRequest("id must be a number");

      const categoryUpdated = await this.categoryService.update(
        id,
        userId,
        updateCategoryDto,
      );
      res.json(categoryUpdated);
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const id = +req.params.id;
    const userId = (req as any).user.id;
    try {
      if (!userId)
        throw CustomError.unauthorized(
          "is necesary an user to realize this action",
        );
      if (isNaN(id)) throw CustomError.unauthorized("id should be a number");
      const categoryDeleted = await this.categoryService.delete(id, userId);
      res.json(categoryDeleted);
    } catch (error) {
      next(error);
    }
  };
}

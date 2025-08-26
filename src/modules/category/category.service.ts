import { CustomError } from "../../errors/CustomError";
import { CategoryModel } from "../../models";

import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";

export class CategoryService {
  constructor(private categoryModel: CategoryModel) {}

  public async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const isCategoryExists = !!(await this.categoryModel.findCategory(
      createCategoryDto.name,
      userId,
    ));
    if (isCategoryExists) throw CustomError.conflict("Category already exist");

    const categoryCreated = await this.categoryModel.create(
      createCategoryDto,
      userId,
    );

    const { user_id, ...publicCategory } = categoryCreated;
    return publicCategory;
  }

  public async get(userId: number) {
    const categories = await this.categoryModel.getAll(userId);
    return categories;
  }

  public async delete(id: number, userId: number) {
    const isCategoryExists = await this.categoryModel.findCategoryById(
      id,
      userId,
    );
    if (!isCategoryExists) throw CustomError.notFound("Category not found");

    const categoryDeleted = await this.categoryModel.delete(id, userId);
    return categoryDeleted;
  }

  public async update(
    id: number,
    userId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const isCategoryExists = await this.categoryModel.findCategoryById(
      id,
      userId,
    );
    if (!isCategoryExists) throw CustomError.notFound("Category not found");

    const categoryUpdated = await this.categoryModel.update(
      id,
      updateCategoryDto,
    );
    const { user_id, ...publicCategory } = categoryUpdated;
    return publicCategory;
  }
}

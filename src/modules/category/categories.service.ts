import { CustomError } from "../../errors/CustomError";
import { CategoriesModel } from "./categories.model";
import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";

export class CategoriesService {
  constructor(private categoriesModel: CategoriesModel) {}

  public async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const isCategoryExists = !!(await this.categoriesModel.findCategory(
      createCategoryDto.name,
      userId,
    ));
    if (isCategoryExists) throw CustomError.conflict("Category already exist");

    const categoryCreated = await this.categoriesModel.create(
      createCategoryDto,
      userId,
    );

    const { user_id, ...publicCategory } = categoryCreated;
    return publicCategory;
  }

  public async get(userId: number) {
    const categories = await this.categoriesModel.getAll(userId);
    return categories;
  }

  public async delete(id: number, userId: number) {
    const isCategoryExists = await this.categoriesModel.findCategoryById(
      id,
      userId,
    );
    if (!isCategoryExists) throw CustomError.notFound("Category not found");

    const categoryDeleted = await this.categoriesModel.delete(id, userId);
    return categoryDeleted;
  }

  public async update(
    id: number,
    userId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const isCategoryExists = await this.categoriesModel.findCategoryById(
      id,
      userId,
    );
    if (!isCategoryExists) throw CustomError.notFound("Category not found");

    const categoryUpdated = await this.categoriesModel.update(
      id,
      updateCategoryDto,
    );
    const { user_id, ...publicCategory } = categoryUpdated;
    return publicCategory;
  }
}

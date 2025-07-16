import { prisma } from "../../config/db";
import { CustomError } from "../../errors/CustomError";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";

export class CategoriesModel {
  
  public async findCategory(name: string, userId: number) {
    try {
      const category = await prisma.categories.findUnique({
        where: {
          user_id_name: {
            user_id: userId,
            name,
          },
        },
      });
      return category;
    } catch (error) {
      throw CustomError.internal("Error buscando categoria");
    }
  }
  
  public async findCategoryById(id: number, userId: number) {
    try {
      const category = await prisma.categories.findUnique({
        where: {
          id,
          user_id: userId,
        },
      });
      return category;
    } catch (error) {
      throw CustomError.internal("Error buscando categoria");
    }
  }

  public async create(payload: {name: string, budget: number}, userId: number) {
    try {
      const categoryCreated = await prisma.categories.create({
        data: {
          ...payload,
          user_id: userId,
        },
      });
      return categoryCreated;
    } catch (error) {
      throw CustomError.internal("Error creando categoria");
    }
  }

  public async getAll(userId: number) {
    try {
      const categories = await prisma.categories.findMany({
        where: {
          user_id: userId,
        },
      });
      return categories;
    } catch (error) {
      throw CustomError.internal("Error buscando categorias");
    }
  }

  public async delete(id: number, userId: number) {
    try {
      const categoryDeleted = await prisma.categories.delete({
        where: {
          id,
          user_id: userId,
        },
      });
      return categoryDeleted;
    } catch (error) {
      throw CustomError.internal("Error eliminando categoria");
    }
  }

  public async update(id: number, payload: UpdateCategoryDto) {
    try {
      const categoryUpdated = await prisma.categories.update({
        where: {
          id,
        },
        data: payload,
      });
      return categoryUpdated;
    } catch (error) {
      throw CustomError.internal("Error editando categoria");
    }
  }
}

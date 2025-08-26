import { prisma } from "../config/db";
import { CustomError } from "../errors/CustomError";
import { RegisterUserDto } from "../modules/auth/dtos";

export class AuthModel {
  public async findUser(email: string) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw CustomError.internal("Error al buscar usuario");
    }
  }

  public async registerUser(data: RegisterUserDto) {
    try {
      const user = await prisma.users.create({ data });
      return user;
    } catch (error) {
      console.log(error);
      throw CustomError.internal("Error al registrar usuario");
    }
  }
}

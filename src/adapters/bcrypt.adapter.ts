import { hash, compare } from "bcrypt";
import { CustomError } from "../errors/CustomError";

export class BcryptAdapter {
  public static async hashPassword(password: string) {
    try {
      const passwordHashed = await hash(password, 10);
      return passwordHashed;
    } catch (error) {
      console.log(error);
      throw CustomError.internal("hash password error");
    }
  }

  public static async comparePassword(
    password: string,
    passwordHashed: string,
  ) {
    try {
      const isPasswordValid = await compare(password, passwordHashed);
      return isPasswordValid;
    } catch (error) {
      throw CustomError.internal("compare password error");
    }
  }
}

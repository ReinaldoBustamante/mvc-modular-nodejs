import { hash } from "bcrypt";
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
}

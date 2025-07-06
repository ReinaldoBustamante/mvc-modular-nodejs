import { sign } from "jsonwebtoken";
import { CustomError } from "../errors/CustomError";

export class JWTAdapter {
  public static async signPayload(payload: any) {
    try {
      return await new Promise<string>((resolve, reject) => {
        sign(payload, "seed", { expiresIn: 60 * 60 }, (err, token) => {
          if (err || !token) return reject(new Error("generate token error"));
          resolve(token);
        });
      });
    } catch (error) {
      throw CustomError.internal("generate token error");
    }
  }
}

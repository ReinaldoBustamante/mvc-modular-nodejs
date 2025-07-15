import { sign, verify } from "jsonwebtoken";
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
  public static async verifyPayload(payload: any) {
    try {
      return await new Promise<any>((resolve, reject) => {
        verify(payload, "seed", (err: any, decoded: any) => {
          if (err || !decoded) return reject(new Error("verufy payload error"));
          resolve(decoded);
        });
      });
    } catch (error) {
      throw CustomError.internal("verify payload error");
    }
  }
}

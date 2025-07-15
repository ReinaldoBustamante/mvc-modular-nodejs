import { Request, NextFunction, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { JWTAdapter } from "../adapters";
import { JwtPayload } from "jsonwebtoken";

export class authMiddleware {
  public static async validateJWT(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const authorization = req.headers.authorization;

    try {
      if (!authorization) throw CustomError.unauthorized("no bearer token");
      const [authType, token] = authorization.split(" ");
      if (authType !== "Bearer")
        throw CustomError.badRequest("only accept bearer token");
      const payload = (await JWTAdapter.verifyPayload(token)) as JwtPayload;
      (req as any).user = payload;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

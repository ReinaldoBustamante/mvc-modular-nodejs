import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export class ValidateMiddleware {
  public static validate(schema: z.AnyZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

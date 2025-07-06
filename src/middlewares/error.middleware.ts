import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { ZodError } from "zod";

export class ErrorMiddleware {
  public static errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (err instanceof ZodError) {
      res.status(400).json({
        ok: false,
        errors: err.errors.map((e) => {
          return {
            field: e.path.join("."),
            message: e.message,
          };
        }),
      });
      return;
    }

    if (err instanceof CustomError) {
      res.status(err.statusCode).json({
        ok: false,
        errors: [{ message: err.message }],
      });
      return;
    }

    res.status(500).json({
      ok: false,
      errors: [{ message: "Internal Server Error" }],
    });
  }
}

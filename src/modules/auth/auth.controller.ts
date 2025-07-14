import { AuthService } from ".";
import { LoginUserDto, RegisterUserDto } from "./dtos";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(private authService: AuthService) {}

  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const registerUserDto = new RegisterUserDto(req.body);
    try {
      const createdUser = await this.authService.registerUser(registerUserDto);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const loginUserDto = new LoginUserDto(req.body);
    try {
      const validatedUser = await this.authService.loginUser(loginUserDto);
      res.json(validatedUser);
    } catch (error) {
      next(error);
    }
  };
}

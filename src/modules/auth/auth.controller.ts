import { AuthService } from ".";
import { CustomError } from "../../errors/CustomError";
import { RegisterUserDto } from "./dtos/registerUser.dto";
import { Request, Response } from "express";

export class AuthController {
  constructor(public authService: AuthService) {}

  public registerUser = async (req: Request, res: Response) => {
    const registerUserDto = new RegisterUserDto(req.body);
    try {
      const user = await this.authService.registerUser(registerUserDto);
      res.json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.log(error);
        res.status(500).json("error");
      }
    }
  };
}

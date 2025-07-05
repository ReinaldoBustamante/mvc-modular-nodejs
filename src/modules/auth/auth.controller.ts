import { Request, Response } from "express";
import { prisma } from "../../config/db";

export class AuthController {
  constructor() {}

	//test connection
  public getUsers = async (req: Request, res: Response) => {
    const user = await prisma.user.findMany();
    res.json(user);
  };
}

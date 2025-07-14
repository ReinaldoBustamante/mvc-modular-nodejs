import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../src/modules/auth";
import { AuthController } from "../../../src/modules/auth/auth.controller";

const mockAuthService = {
  loginUser: jest.fn(),
  registerUser: jest.fn(),
} as unknown as AuthService;

let authController: AuthController;
let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

const initTest = (body: { [key: string]: any }) => {
  authController = new AuthController(mockAuthService);
  req = { body };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  next = jest.fn();
  jest.clearAllMocks();
};

describe("authController - registerUser", () => {
  beforeEach(() => {
    initTest({ email: "test@example.com", name: "example", password: "123" });
  });

  it("should return the registered user in the response", async () => {
    const mockCreatedUser = { email: "test@example.com", name: "example" };
    (mockAuthService.registerUser as jest.Mock).mockResolvedValue(
      mockCreatedUser,
    );
    await authController.registerUser(
      req as unknown as Request,
      res as unknown as Response,
      next,
    );
    expect(res.json).toHaveBeenCalledWith(mockCreatedUser);
  });

  it("should call next(error) when an error occurs", async () => {
    (mockAuthService.registerUser as jest.Mock).mockRejectedValue(
      new Error("algo salio mal"),
    );
    await authController.registerUser(
      req as unknown as Request,
      res as unknown as Response,
      next,
    );
    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error("algo salio mal"));
  });
});

describe("authController - loginUser", () => {
  beforeEach(() => {
    initTest({ email: "test@example.com", password: "123" });
  });

  it("should return a validate user with his token in response", async () => {
    const mockValidatedUser = { status: "logged", token: "123" };
    (mockAuthService.loginUser as jest.Mock).mockResolvedValue(
      mockValidatedUser,
    );
    await authController.loginUser(
      req as unknown as Request,
      res as unknown as Response,
      next,
    );
    expect(res.json).toHaveBeenCalledWith(mockValidatedUser);
  });

  it("should call next(error) when an error occurs", async () => {
    (mockAuthService.loginUser as jest.Mock).mockRejectedValue(
      new Error("algo salio mal"),
    );
    await authController.loginUser(
      req as unknown as Request,
      res as unknown as Response,
      next,
    );
    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error("algo salio mal"));
  });
});

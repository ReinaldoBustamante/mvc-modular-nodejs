import { BcryptAdapter } from "../../../src/adapters/bcrypt.adapter";
import { JWTAdapter } from "../../../src/adapters/jwt.adapter";
import { CustomError } from "../../../src/errors/CustomError";
import { AuthService } from "../../../src/modules/auth/auth.service";

const mockAuthModel = {
  findUser: jest.fn(),
  registerUser: jest.fn(),
};

jest.mock("../../../src/adapters/bcrypt.adapter", () => ({
  BcryptAdapter: {
    hashPassword: jest.fn(),
    comparePassword: jest.fn(),
  },
}));
jest.mock("../../../src/adapters/jwt.adapter", () => ({
  JWTAdapter: {
    signPayload: jest.fn(),
  },
}));

let authService: AuthService;

describe("authService - registerUser", () => {
  beforeEach(() => {
    authService = new AuthService(mockAuthModel);
    jest.clearAllMocks();
  });
  it("should return an error when trying to create a user that already exists", async () => {
    const mockUser = {
      name: "reinaldo",
      email: "reinaldo@gmail.com",
      password: "123",
    };
    mockAuthModel.findUser.mockResolvedValue(mockUser);
    const user = authService.registerUser(mockUser);
    await expect(user).rejects.toThrow(
      CustomError.conflict("User already exist"),
    );
  });
  it("should return the user without their password", async () => {
    const mockUser = {
      name: "reinaldo",
      email: "reinaldo@gmail.com",
      password: "123",
    };
    mockAuthModel.findUser.mockResolvedValue(null);
    mockAuthModel.registerUser.mockResolvedValue(mockUser);
    const user = await authService.registerUser(mockUser);
    expect(user).toEqual({ name: "reinaldo", email: "reinaldo@gmail.com" });
  });
});

describe("authService - loginUser", () => {
  beforeEach(() => {
    authService = new AuthService(mockAuthModel);
    jest.clearAllMocks();
  });

  it("should return a customError message when user not found", async () => {
    mockAuthModel.findUser.mockResolvedValue(null);
    const user = authService.loginUser({
      email: "reinaldo.bustamante@gmail.com",
      password: "123",
    });
    await expect(user).rejects.toThrow(
      CustomError.notFound("User reinaldo.bustamante@gmail.com not found"),
    );
  });

  it("should return a customError message when password is invalid", async () => {
    mockAuthModel.findUser.mockResolvedValue({
      email: "test@gmail.com",
      password: "123",
    });
    (BcryptAdapter.comparePassword as jest.Mock).mockReturnValue(false);
    const user = authService.loginUser({
      email: "test@gmail.com",
      password: "1234",
    });
    await expect(user).rejects.toThrow(
      CustomError.unauthorized("invalid password"),
    );
  });

  it("should return a user with his status and token access", async () => {
    mockAuthModel.findUser.mockResolvedValue({
      email: "test@gmail.com",
      password: "123",
    });
    (BcryptAdapter.comparePassword as jest.Mock).mockReturnValue(true);
    (JWTAdapter.signPayload as jest.Mock).mockReturnValue("token");
    const user = await authService.loginUser({
      email: "test@gmail.com",
      password: "123",
    });
    expect(user).toEqual({
      status: "logged",
      token: "token",
    });
  });
});

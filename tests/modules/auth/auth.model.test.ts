import { prisma } from "../../../src/config/db";
import { CustomError } from "../../../src/errors/CustomError";
import { AuthModel } from "../../../src/modules/auth/auth.model";

jest.mock("../../../src/config/db", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));
let authModel: AuthModel;
describe("authModel - findUser", () => {
  beforeEach(() => {
    authModel = new AuthModel();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("should return user when email exists", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    const result = await authModel.findUser("test@example.com");

    expect(result).toEqual(mockUser);
  });

  it("should return an internal server error when an error occurs while attempting to find a user", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      CustomError.internal("Error al buscar usuario"),
    );
    const result = authModel.findUser("test@example.com");
    await expect(result).rejects.toMatchObject({
      message: "Error al buscar usuario",
      statusCode: 500,
    });
  });
});

describe("authModel - registerUser", () => {
  beforeEach(() => {
    authModel = new AuthModel();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("should return a new user", async () => {
    const mockRegisterUser = {
      email: "test@example.com",
      name: "reinaldo bustamante",
      password: "123",
    };
    (prisma.user.create as jest.Mock).mockResolvedValue(mockRegisterUser);
    const userRegister = await authModel.registerUser(mockRegisterUser);
    expect(userRegister).toEqual(mockRegisterUser);
  });

  it("should return an internal server error while attempting to create a user", async () => {
    (prisma.user.create as jest.Mock).mockRejectedValue(
      CustomError.internal("Error al registrar usuario"),
    );
    const result = authModel.registerUser({
      email: "test@example.com",
      name: "reinaldo bustamante",
      password: "123",
    });
    await expect(result).rejects.toMatchObject({
      message: "Error al registrar usuario",
      statusCode: 500,
    });
  });
});

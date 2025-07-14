import { AuthModel } from ".";
import { BcryptAdapter, JWTAdapter } from "../../adapters";
import { CustomError } from "../../errors/CustomError";
import { LoginUserDto, RegisterUserDto } from "./dtos";

export class AuthService {
  constructor(private authModel: AuthModel) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const isUserExist = !!(await this.authModel.findUser(
      registerUserDto.email,
    ));
    if (isUserExist) throw CustomError.conflict("User already exist");

    const createdUser = await this.authModel.registerUser({
      ...registerUserDto,
      password: await BcryptAdapter.hashPassword(registerUserDto.password),
    });

    const { password, ...publicUser } = createdUser;
    return publicUser;
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const userFound = await this.authModel.findUser(loginUserDto.email);
    if (!userFound)
      throw CustomError.notFound(`User ${loginUserDto.email} not found`);

    const isPasswordValid = await BcryptAdapter.comparePassword(
      loginUserDto.password,
      userFound.password,
    );
    if (!isPasswordValid) throw CustomError.unauthorized("invalid password");

    const token = await JWTAdapter.signPayload({
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    });

    return {
      status: "logged",
      token: token,
    };
  }
}

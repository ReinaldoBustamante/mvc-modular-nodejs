import { AuthModel } from ".";
import { BcryptAdapter } from "../../adapters/bcrypt.adapter";
import { CustomError } from "../../errors/CustomError";
import { RegisterUserDto } from "./dtos/registerUser.dto";

export class AuthService {
  constructor(public authModel: AuthModel) {}

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
}

interface LoginUserDtoProps {
  email: string;
  password: string;
}

export class LoginUserDto {
  public email: string;
  public password: string;

  constructor(data: LoginUserDtoProps) {
    ((this.email = data.email), (this.password = data.password));
  }
}

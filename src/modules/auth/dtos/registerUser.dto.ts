export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class RegisterUserDto {
  public name: string;
  public email: string;
  public password: string;
  public role: string;

  constructor(data: RegisterUserProps) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}

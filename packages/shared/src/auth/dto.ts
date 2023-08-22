import { LogInRequest } from "./requests";

export class LogInDto {
  email: string;
  password: string;

  constructor(request: LogInRequest) {
    this.email = request.body.email;
    this.password = request.body.password;
  }
}

import {
  CreateUserRequest,
  DeleteUserRequest,
  PatchUserRequest,
  UpdateUserRequest,
} from "./request";

export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  imgUrl?: string;

  constructor(request: CreateUserRequest) {
    this.email = request.body.email;
    this.firstName = request.body.firstName;
    this.lastName = request.body.lastName;
    this.password = request.body.password;
    this.imgUrl = request.body.imgUrl;
  }
}

export class PatchUserDto {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  imgUrl?: string;

  constructor(request: PatchUserRequest) {
    this.id = request.params.userId;
    this.email = request.body.email;
    this.firstName = request.body.firstName;
    this.lastName = request.body.lastName;
    this.password = request.body.password;
    this.imgUrl = request.body.imgUrl;
  }
}

export class UpdateUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  imgUrl?: string;

  constructor(request: UpdateUserRequest) {
    this.id = request.params.userId;
    this.email = request.body.email;
    this.firstName = request.body.firstName;
    this.lastName = request.body.lastName;
    this.password = request.body.password;
    this.imgUrl = request.body.imgUrl;
  }
}

export class DeleteUserDto {
  id: string;

  constructor(request: DeleteUserRequest) {
    this.id = request.params.userId;
  }
}

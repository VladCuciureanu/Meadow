import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import * as argon2 from "argon2";
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  GetUserRequest,
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserDto,
} from "@meadow/shared";
import { MeadowDataSource } from "../../config/typeorm";
import { UserMapper } from "./user.mapper";

class UsersService {
  usersRepository: Repository<UserEntity>;

  constructor() {
    this.usersRepository = MeadowDataSource.getRepository(UserEntity);
  }

  async getUsers(dto: GetUsersRequest): Promise<GetUsersResponse> {
    const skipCount = Math.max(0, dto.limit * dto.page);
    const users = await this.usersRepository.find({
      take: dto.limit,
      skip: skipCount,
    });

    return users.map((user) => UserMapper.toPartialDto(user));
  }

  async getUserById(
    dto: GetUserRequest,
    currentUser?: UserDto
  ): Promise<GetUserResponse> {
    const user = await this.usersRepository.findOne({
      where: { id: dto.id },
    });

    if (!user) {
      return Promise.reject("Could not find user.");
    }

    if (user.id === currentUser?.id) {
      return UserMapper.toDto(user);
    }

    return UserMapper.toPartialDto(user);
  }

  async getUserByEmail(email: string): Promise<GetUserResponse | null> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    return user ? UserMapper.toDto(user) : null;
  }

  async createUser(dto: CreateUserRequest): Promise<CreateUserResponse> {
    const passwordHash = await argon2.hash(dto.password);

    const user = await this.usersRepository.save(
      this.usersRepository.create({
        email: dto.email,
        passwordHash: passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        imgUrl: dto.imgUrl,
      })
    );

    return UserMapper.toDto(user);
  }

  async updateUser(dto: UpdateUserRequest): Promise<UpdateUserResponse | null> {
    let updatedFields: Record<string, any> = {};

    if (dto.email) {
      updatedFields.email = dto.email;
    }
    if (dto.firstName) {
      updatedFields.firstName = dto.firstName;
    }
    if (dto.lastName) {
      updatedFields.lastName = dto.lastName;
    }
    if (dto.imgUrl) {
      updatedFields.imgUrl = dto.imgUrl;
    }
    if (dto.password) {
      updatedFields.passwordHash = await argon2.hash(dto.password);
    }

    const updateResponse = await this.usersRepository.update(
      {
        id: dto.id,
      },
      updatedFields
    );

    if ((updateResponse.affected ?? 1) === 0) {
      return null;
    }

    const updatedUser = updateResponse.generatedMaps.at(0) as UserEntity;

    return UserMapper.toDto(updatedUser);
  }

  async deleteUser(dto: DeleteUserRequest): Promise<boolean> {
    const result = await this.usersRepository.delete({
      id: dto.id,
    });

    if (result.affected === 0) {
      return false;
    }

    return true;
  }
}

export default new UsersService();

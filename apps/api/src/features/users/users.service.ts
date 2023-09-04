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
import * as argon2 from "argon2";
import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import { UsersMapper } from "./users.mapper";
import { MeadowDataSource } from "../../config/typeorm";

class UsersService {
  usersRepository: Repository<UserEntity>;

  constructor() {
    this.usersRepository = MeadowDataSource.getRepository(UserEntity);
  }

  async getUsers(dto: GetUsersRequest): Promise<GetUsersResponse> {
    const skipCount = dto.limit * (dto.page - 1);

    const entities = await this.usersRepository.find({
      take: dto.limit,
      skip: skipCount,
    });

    return entities.map((entity) => UsersMapper.toPartialDto(entity));
  }

  async getUserById(
    dto: GetUserRequest,
    currentUser?: UserDto
  ): Promise<GetUserResponse> {
    const entity = await this.usersRepository.findOne({
      where: { id: dto.id },
    })!;

    if (entity!.id === currentUser?.id) {
      return UsersMapper.toDto(entity!);
    }

    return UsersMapper.toPartialDto(entity!);
  }

  async getUserByEmail(email: string): Promise<GetUserResponse> {
    const entity = await this.usersRepository.findOne({
      where: { email: email },
    });

    return UsersMapper.toDto(entity!);
  }

  async createUser(dto: CreateUserRequest): Promise<CreateUserResponse> {
    const passwordHash = await argon2.hash(dto.password);

    const entity = await this.usersRepository.save(
      this.usersRepository.create({
        email: dto.email,
        passwordHash: passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        imgUrl: dto.imgUrl,
      })
    );

    return UsersMapper.toDto(entity);
  }

  async updateUser(dto: UpdateUserRequest): Promise<UpdateUserResponse> {
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

    const updatedEntity = updateResponse.generatedMaps.at(0) as UserEntity;

    return UsersMapper.toDto(updatedEntity);
  }

  async deleteUser(dto: DeleteUserRequest) {
    await this.usersRepository.delete({
      id: dto.id,
    });
  }
}

export default new UsersService();

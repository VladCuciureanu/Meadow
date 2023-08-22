import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import * as argon2 from "argon2";
import {
  CreateUserDto,
  DeleteUserDto,
  PatchUserDto,
  UpdateUserDto,
} from "@meadow/shared";
import { MeadowDataSource } from "../../config/typeorm";

class UsersService {
  usersRepository: Repository<UserEntity>;

  constructor() {
    this.usersRepository = MeadowDataSource.getRepository(UserEntity);
  }

  async getMany(limit: number, page: number) {
    const skipCount = Math.max(0, limit * page);
    return this.usersRepository.find({
      take: limit,
      skip: skipCount,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        imgUrl: true,
        passwordHash: false,
      },
    });
  }

  async getById(userId: string) {
    return this.usersRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        imgUrl: true,
        passwordHash: false,
      },
    });
  }

  async getByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email: email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        imgUrl: true,
        passwordHash: false,
      },
    });
  }

  async create(dto: CreateUserDto) {
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

    return user;
  }

  async patch(dto: PatchUserDto) {
    if (dto.password) {
      dto.password = await argon2.hash(dto.password);
    }

    (dto as any).passwordHash = dto.password;

    delete (dto as any).password;

    const updatedUser = await this.usersRepository.update(
      {
        id: dto.id,
      },
      dto
    );

    return updatedUser;
  }

  async put(dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await argon2.hash(dto.password);
    }

    (dto as any).passwordHash = dto.password;

    delete (dto as any).password;

    const updatedUser = await this.usersRepository.update(
      {
        id: dto.id,
      },
      dto
    );

    return updatedUser;
  }

  async delete(dto: DeleteUserDto) {
    return this.usersRepository.delete({
      id: dto.id,
    });
  }
}

export default new UsersService();

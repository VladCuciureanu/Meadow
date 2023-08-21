import { Repository } from "typeorm";
import { User } from "./user.model";
import * as argon2 from "argon2";
import { z } from "zod";
import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
} from "@meadow/shared";
import { MeadowDataSource } from "../../config/typeorm";

class UsersService {
  usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = MeadowDataSource.getRepository(User);
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

  async create(dto: z.infer<typeof CreateUserSchema>) {
    const passwordHash = await argon2.hash(dto.body.password);

    const user = await this.usersRepository.save(
      this.usersRepository.create({
        email: dto.body.email,
        passwordHash: passwordHash,
        firstName: dto.body.firstName,
        lastName: dto.body.lastName,
        imgUrl: dto.body.imgUrl,
      })
    );

    return user;
  }

  async patch(dto: z.infer<typeof PatchUserSchema>) {
    if (dto.body.password) {
      dto.body.password = await argon2.hash(dto.body.password);
    }

    (dto.body as any).passwordHash = dto.body.password;

    delete (dto.body as any).password;

    const updatedUser = await this.usersRepository.update(
      {
        id: dto.params.userId,
      },
      dto.body
    );

    return updatedUser;
  }

  async put(dto: z.infer<typeof UpdateUserSchema>) {
    if (dto.body.password) {
      dto.body.password = await argon2.hash(dto.body.password);
    }

    (dto.body as any).passwordHash = dto.body.password;

    delete (dto.body as any).password;

    const updatedUser = await this.usersRepository.update(
      {
        id: dto.params.userId,
      },
      dto.body
    );

    return updatedUser;
  }

  async delete(userId: string) {
    return this.usersRepository.delete({
      id: userId,
    });
  }
}

export default new UsersService();

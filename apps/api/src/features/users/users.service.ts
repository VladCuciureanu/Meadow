import { Repository } from "typeorm";
import { MeadowDataSource } from "../data-source";
import { User } from "./models/user";
import * as argon2 from "argon2";
import { TypeOf } from "zod";
import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
} from "@meadow/shared";

class UsersService {
  usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = MeadowDataSource.getRepository(User);
  }

  async getAll(limit: number, page: number) {
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

  async getById(resourceId: string) {
    return this.usersRepository.findOne({
      where: { id: resourceId },
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

  async create(dto: TypeOf<typeof CreateUserSchema>) {
    const passwordHash = await argon2.hash(dto.body.password);

    const user = this.usersRepository.create({
      email: dto.body.email,
      passwordHash: passwordHash,
      firstName: dto.body.firstName,
      lastName: dto.body.lastName,
      imgUrl: dto.body.imgUrl,
    });

    const savedUser = await this.usersRepository.save(user);

    delete (savedUser as any).passwordHash;

    return savedUser;
  }

  async patchById(dto: TypeOf<typeof PatchUserSchema>) {
    if (dto.body.password) {
      dto.body.password = await argon2.hash(dto.body.password);
    }

    const patchedValues = {} as any;

    Object.entries(dto.body).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "password") {
          patchedValues["passwordHash"] = value;
        } else {
          patchedValues[key] = value;
        }
      }
    });

    const updatedUser = await this.usersRepository.update(
      {
        id: dto.params.userId,
      },
      patchedValues
    );

    delete (updatedUser as any).passwordHash;

    return updatedUser;
  }

  async updateById(dto: TypeOf<typeof UpdateUserSchema>) {
    const updatedUser = await this.usersRepository.update(
      {
        id: dto.params.userId,
      },
      dto.body
    );

    delete (updatedUser as any).passwordHash;

    return updatedUser;
  }

  async deleteById(resourceId: string) {
    return this.usersRepository.delete({
      id: resourceId,
    });
  }

  // async getUserByEmail(email: string) {
  //   return UsersDao.getUserByEmail(email);
  // }
}

export default new UsersService();

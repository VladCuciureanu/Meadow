import { Repository } from "typeorm";
import { MeadowDataSource } from "../../config/typeorm";
import * as argon2 from "argon2";
import { TypeOf } from "zod";
import { LogInUserSchema } from "@meadow/shared";
import { User } from "../users/models/user";
import jwt from "jsonwebtoken";

class AuthService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = MeadowDataSource.getRepository(User);
  }

  async getToken(dto: TypeOf<typeof LogInUserSchema>) {
    const user = await this.userRepository.findOne({
      where: { email: dto.body.email },
    });

    if (
      user !== null &&
      (await argon2.verify(user!.passwordHash, dto.body.password))
    ) {
      const payload = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      return { token: payload };
    } else {
      throw new Error();
    }
  }
}

export default new AuthService();

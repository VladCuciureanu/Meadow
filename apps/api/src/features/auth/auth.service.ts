import { Repository } from "typeorm";
import { MeadowDataSource } from "../../config/typeorm";
import { LogInDto } from "@meadow/shared";
import { JWTPayload } from "./auth.interfaces";
import { User } from "../users/user.model";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";

class AuthService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = MeadowDataSource.getRepository(User);
  }

  async getToken(dto: LogInDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (
      user !== null &&
      (await argon2.verify(user!.passwordHash, dto.password))
    ) {
      const payload = jwt.sign(
        { userId: user.id } satisfies JWTPayload,
        process.env.JWT_SECRET!
      );
      return payload;
    } else {
      throw new Error();
    }
  }
}

export default new AuthService();

import { Repository } from "typeorm";
import { MeadowDataSource } from "../../config/typeorm";
import { LogInDto } from "@meadow/shared";
import { UserEntity } from "../users/user.entity";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { JWTPayload } from "./middlewares/jwt-payload";

class AuthService {
  userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = MeadowDataSource.getRepository(UserEntity);
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

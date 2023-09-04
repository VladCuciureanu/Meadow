import { Repository } from "typeorm";
import { MeadowDataSource } from "../../config/typeorm";
import { UserEntity } from "../users/users.entity";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { JWTPayload } from "./interfaces/jwt-payload";
import { GetTokenRequest } from "@meadow/shared";
import { GetTokenResponse } from "@meadow/shared";

class AuthService {
  userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = MeadowDataSource.getRepository(UserEntity);
  }

  async getToken(dto: GetTokenRequest): Promise<GetTokenResponse | null> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (user === null) {
      return null;
    }

    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      dto.password
    );

    if (!isPasswordValid) {
      return null;
    }

    return jwt.sign(
      { userId: user.id } satisfies JWTPayload,
      process.env.JWT_SECRET!
    );
  }
}

export default new AuthService();

import { Repository } from "typeorm";
import { MeadowDataSource } from "../../config/typeorm";
import { UserEntity } from "../users/user.entity";
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

  async getToken(dto: GetTokenRequest): Promise<GetTokenResponse> {
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

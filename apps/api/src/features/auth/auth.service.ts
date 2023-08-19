import { Repository } from "typeorm";
import { MeadowDataSource } from "../../config/typeorm";
import * as argon2 from "argon2";
import { UserCredentialsSchema } from "@meadow/shared";
import { User } from "../users/user.model";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { JWTPayload } from "./auth.interfaces";

class AuthService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = MeadowDataSource.getRepository(User);
  }

  async getToken(dto: z.infer<typeof UserCredentialsSchema>) {
    const user = await this.userRepository.findOne({
      where: { email: dto.body.email },
    });

    if (
      user !== null &&
      (await argon2.verify(user!.passwordHash, dto.body.password))
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

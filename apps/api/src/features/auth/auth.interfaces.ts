import { User } from "@meadow/shared";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type AuthenticatedRequest = Request & {
  auth: {
    user: User;
  };
};

export type JWTPayload = JwtPayload & {
  userId: string;
};

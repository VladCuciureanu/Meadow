import { User } from "@meadow/shared";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type AuthenticatedRequest = Request & {
  user: User;
};

export type JWTPayload = JwtPayload & {
  userId: string;
};

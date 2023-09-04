import { UserDto } from "@meadow/shared";
import { Request } from "express";

export type AuthenticatedRequest = Request & {
  user: UserDto;
};

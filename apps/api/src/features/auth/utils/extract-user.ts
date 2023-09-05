import express from "express";
import { AuthenticatedRequest } from "../interfaces/authenticated-request";
import { UserDto } from "@meadow/shared";

export function extractUser(req: express.Request): UserDto {
  const user = (req as AuthenticatedRequest).user as UserDto;
  if (!user) {
    throw new Error(
      "Failed to extract user from request. Is the route hooked up to auth?"
    );
  }
  return user;
}

import { UserDto } from "@meadow/shared";
import express from "express";

export function validateCurrentUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if ((req.user as UserDto).id === req.params.id) {
    next();
  } else {
    res
      .status(403)
      .send({ error: `You are not authorized to do requested action.` });
  }
}

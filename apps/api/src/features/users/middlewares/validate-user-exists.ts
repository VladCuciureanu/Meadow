import express from "express";
import usersService from "../users.service";
import { HasUserIdSchema } from "@meadow/shared";

export async function validateUserExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasUserIdSchema.parse(req);
  const user = await usersService.getUserById({ id: schema.params.userId });

  if (user) {
    next();
  } else {
    res.status(404).send({ error: `User ${schema.params.userId} not found` });
  }
}

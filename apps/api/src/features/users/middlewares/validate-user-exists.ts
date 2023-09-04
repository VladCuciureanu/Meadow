import express from "express";
import usersService from "../users.service";

export async function validateUserExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const userId = req.params.id;

  const user = await usersService.getUserById({ id: userId });

  if (user) {
    next();
  } else {
    res.status(404).send({ error: `User ${userId} not found` });
  }
}

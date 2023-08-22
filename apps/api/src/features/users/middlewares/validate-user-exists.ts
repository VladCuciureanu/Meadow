import express from "express";
import usersService from "../users.service";

export async function validateUserExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const user = await usersService.getById(req.params.userId);
  if (user) {
    next();
  } else {
    res.status(404).send({ error: `User ${req.params.userId} not found` });
  }
}

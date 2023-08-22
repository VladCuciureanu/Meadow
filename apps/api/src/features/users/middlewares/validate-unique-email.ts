import express from "express";
import usersService from "../users.service";
import MeadowError from "../../common/interfaces/error";

export async function validateEmailIsUnique(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const bodyContainsEmail = Object.keys(req.body).includes("email");

  if (!bodyContainsEmail) {
    next();
  }

  const user = await usersService.getByEmail(req.body.email);

  if (!user) {
    next();
  } else {
    next(new MeadowError(500, "Request payload failed validation"));
  }
}

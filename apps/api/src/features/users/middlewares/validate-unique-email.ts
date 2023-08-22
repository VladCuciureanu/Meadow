import express from "express";
import { MeadowError } from "../../common/interfaces/error";
import usersService from "../users.service";

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
    res.status(500).send({
      status: "Failed payload validations.",
      errors: ["Email must be unique."],
    } as MeadowError);
  }
}

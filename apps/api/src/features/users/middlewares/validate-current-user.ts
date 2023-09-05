import { HasUserIdSchema } from "@meadow/shared";
import express from "express";
import { extractUser } from "../../auth/utils/extract-user";

export function validateCurrentUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasUserIdSchema.parse(req);
  const currentUser = extractUser(req);

  if (currentUser.id === schema.params.userId) {
    next();
  } else {
    res
      .status(403)
      .send({ error: `You are not authorized to do requested action.` });
  }
}

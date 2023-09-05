import { HasUserIdSchema } from "@meadow/shared";
import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";

export function validateCurrentUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasUserIdSchema.parse(req);
  const currentUser = (req as AuthenticatedRequest).user;

  if (currentUser.id === schema.params.userId) {
    next();
  } else {
    res
      .status(403)
      .send({ error: `You are not authorized to do requested action.` });
  }
}

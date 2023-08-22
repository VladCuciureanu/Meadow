import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";

export function validateCurrentUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if ((req as any as AuthenticatedRequest).user.id === req.params.userId) {
    next();
  } else {
    res
      .status(403)
      .send({ error: `You are not authorized to do requested action.` });
  }
}

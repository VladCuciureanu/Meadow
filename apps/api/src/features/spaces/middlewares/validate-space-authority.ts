import express from "express";
import spacesService from "../spaces.service";
import { HasSpaceIdSchema } from "@meadow/shared";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";

export async function validateSpaceAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasSpaceIdSchema.parse(req);
  const currentUser = (req as AuthenticatedRequest).user;

  const userHasAuthority = await spacesService.isUserAuthorized(
    schema.params.spaceId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    res.sendStatus(403);
  }
}

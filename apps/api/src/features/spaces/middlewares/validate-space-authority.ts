import express from "express";
import spacesService from "../spaces.service";
import { HasSpaceIdSchema } from "@meadow/shared";
import { extractUser } from "../../auth/utils/extract-user";

export async function validateSpaceAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasSpaceIdSchema.parse(req);
  const currentUser = extractUser(req);

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

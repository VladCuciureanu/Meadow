import express from "express";
import { extractUser } from "../../auth/utils/extract-user";
import spacesService from "../../spaces/spaces.service";
import { MutableFolderFields } from "@meadow/shared";

export async function validateFolderSpaceAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const body = MutableFolderFields.deepPartial().parse(req.body);
  const currentUser = extractUser(req);

  if (body.spaceId === undefined) {
    return next();
  }

  const userHasAuthority = await spacesService.isUserAuthorized(
    body.spaceId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    return res.sendStatus(403);
  }
}

import express from "express";
import { HasFolderIdSchema } from "@meadow/shared";
import foldersService from "../folders.service";
import { extractUser } from "../../auth/utils/extract-user";

export async function validateFolderAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasFolderIdSchema.parse(req);
  const currentUser = extractUser(req);

  const userHasAuthority = await foldersService.isUserAuthorized(
    schema.params.folderId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    res.sendStatus(403);
  }
}

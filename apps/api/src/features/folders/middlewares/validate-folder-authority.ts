import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import { HasFolderIdSchema } from "@meadow/shared";
import foldersService from "../folders.service";

export async function validateFolderAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasFolderIdSchema.parse(req);
  const currentUser = (req as AuthenticatedRequest).user;

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

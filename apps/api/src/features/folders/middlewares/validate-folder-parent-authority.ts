import express from "express";
import { extractUser } from "../../auth/utils/extract-user";
import { MutableFolderFields } from "@meadow/shared";
import foldersService from "../folders.service";

export async function validateFolderParentAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const body = MutableFolderFields.deepPartial().parse(req.body);
  const currentUser = extractUser(req);

  if (body.parentFolderId === undefined) {
    return next();
  }

  const userHasAuthority = await foldersService.isUserAuthorized(
    body.parentFolderId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    return res.sendStatus(403);
  }
}

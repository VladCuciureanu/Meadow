import express from "express";
import { extractUser } from "../../auth/utils/extract-user";
import { MutableDocumentFields } from "@meadow/shared";
import foldersService from "../../folders/folders.service";

export async function validateDocumentFolderAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const body = MutableDocumentFields.deepPartial().parse(req.body);

  const currentUser = extractUser(req);

  if (body.folderId === undefined) {
    return next();
  }

  const userHasAuthority = await foldersService.isUserAuthorized(
    body.folderId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    return res.sendStatus(403);
  }
}

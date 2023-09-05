import express from "express";
import documentsService from "../documents.service";
import { HasDocumentIdSchema } from "@meadow/shared";
import { extractUser } from "../../auth/utils/extract-user";

export async function validateDocumentAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasDocumentIdSchema.parse(req);
  const currentUser = extractUser(req);

  const userHasAuthority = await documentsService.isUserAuthorized(
    schema.params.documentId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    res.sendStatus(403);
  }
}

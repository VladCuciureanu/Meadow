import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import documentsService from "../documents.service";
import { HasDocumentIdSchema } from "@meadow/shared";

export async function validateDocumentAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasDocumentIdSchema.parse(req);
  const currentUser = (req as AuthenticatedRequest).user;

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

import express from "express";
import documentsService from "../documents.service";
import { HasDocumentIdSchema } from "@meadow/shared";

export async function validateDocumentExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasDocumentIdSchema.parse(req);
  const document = await documentsService.getDocumentById({
    id: schema.params.documentId,
  });

  if (document) {
    next();
  } else {
    res.sendStatus(404);
  }
}

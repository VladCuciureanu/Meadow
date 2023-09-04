import express from "express";
import documentsService from "../documents.service";

export async function validateDocumentExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const document = await documentsService.getDocumentById({
    id: req.params.documentId,
  });

  if (document) {
    next();
  } else {
    res.sendStatus(404);
  }
}

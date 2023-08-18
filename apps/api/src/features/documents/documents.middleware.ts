import express from "express";
import DocumentsService from "./documents.service";

class DocumentsMiddleware {
  async validateDocumentExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const document = await DocumentsService.readById(req.params.documentId);
    if (document) {
      next();
    } else {
      res
        .status(404)
        .send({ error: `Document ${req.params.documentId} not found` });
    }
  }

  async extractDocumentId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.documentId;
    next();
  }
}

export default new DocumentsMiddleware();

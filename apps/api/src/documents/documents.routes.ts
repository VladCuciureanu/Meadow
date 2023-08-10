import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";

import DocumentsMiddleware from "./documents.middleware";
import DocumentsController from "./documents.controller";

export class DocumentsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "DocumentsRoutes");
  }

  configureRoutes() {
    this.app.route(`/documents`);
    // .get(DocumentsController.listDocuments)
    // .post(DocumentsController.createDocument);

    this.app.param(`documentId`, DocumentsMiddleware.extractDocumentId);
    this.app
      .route(`/documents/:documentId`)
      .all(DocumentsMiddleware.validateDocumentExists)
      .get(DocumentsController.getDocumentById);
    // .delete(DocumentsController.removeDocument)
    // .put(DocumentsController.put)
    // .patch(DocumentsController.patch);

    return this.app;
  }
}

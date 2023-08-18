import { Router } from "express";

import DocumentsMiddleware from "./documents.middleware";
import DocumentsController from "./documents.controller";

const DocumentRoutes = Router();

DocumentRoutes.route(`/documents`);
// .get(DocumentsController.listDocuments)
// .post(DocumentsController.createDocument);

DocumentRoutes.param(`documentId`, DocumentsMiddleware.extractDocumentId);
DocumentRoutes.route(`/documents/:documentId`)
  .all(DocumentsMiddleware.validateDocumentExists)
  .get(DocumentsController.getDocumentById);
// .delete(DocumentsController.removeDocument)
// .put(DocumentsController.put)
// .patch(DocumentsController.patch);

export default DocumentRoutes;

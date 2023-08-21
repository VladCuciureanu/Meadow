import { Router } from "express";

import documentsMiddleware from "./documents.middleware";
import documentsController from "./documents.controller";
import { validate } from "../common/common.middleware";
import {
  CreateDocumentSchema,
  PatchDocumentSchema,
  UpdateDocumentSchema,
} from "@meadow/shared";

const DocumentRoutes = Router();

DocumentRoutes.route(`/`)
  .get(documentsController.getMany)
  .post(validate(CreateDocumentSchema), documentsController.create);

DocumentRoutes.route(`/:documentId`)
  .all(
    documentsMiddleware.validateDocumentExists,
    documentsMiddleware.validateDocumentAuthority
  )
  .get(documentsController.getById)
  .put(validate(UpdateDocumentSchema), documentsController.put)
  .patch(validate(PatchDocumentSchema), documentsController.patch)
  .delete(documentsController.delete);

export default DocumentRoutes;

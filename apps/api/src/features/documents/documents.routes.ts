import { Router } from "express";
import documentsController from "./documents.controller";
import {
  CreateDocumentSchema,
  PatchDocumentSchema,
  UpdateDocumentSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateDocumentAuthority } from "./middlewares/validate-document-authority";
import { validateDocumentExists } from "./middlewares/validate-document-exists";
import { authenticate } from "../auth/middlewares/authenticate";

const DocumentRoutes = Router();

DocumentRoutes.route(`/`)
  .all(authenticate)
  .get(documentsController.getMany)
  .post(validate(CreateDocumentSchema), documentsController.create);

DocumentRoutes.route(`/:id`)
  .all(authenticate, validateDocumentExists, validateDocumentAuthority)
  .get(documentsController.getById)
  .put(validate(UpdateDocumentSchema), documentsController.put)
  .patch(validate(PatchDocumentSchema), documentsController.patch)
  .delete(documentsController.delete);

export default DocumentRoutes;

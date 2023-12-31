import { Router } from "express";
import documentsController from "./documents.controller";
import {
  CreateFolderRequestSchema,
  DeleteFolderRequestSchema,
  GetFolderRequestSchema,
  GetFoldersRequestSchema,
  UpdateFolderRequestSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateDocumentAuthority } from "./middlewares/validate-document-authority";
import { validateDocumentExists } from "./middlewares/validate-document-exists";
import { authenticate } from "../auth/middlewares/authenticate";
import { validateDocumentFolderAuthority } from "./middlewares/validate-document-folder-authority";

const DocumentRoutes = Router();

DocumentRoutes.route(`/`)
  .all(authenticate)
  .get(validate(GetFoldersRequestSchema), documentsController.getMany)
  .post(
    validate(CreateFolderRequestSchema),
    validateDocumentFolderAuthority,
    documentsController.create
  );

DocumentRoutes.route(`/:documentId`)
  .all(authenticate, validateDocumentExists, validateDocumentAuthority)
  .get(validate(GetFolderRequestSchema), documentsController.getById)
  .patch(
    validate(UpdateFolderRequestSchema),
    validateDocumentFolderAuthority,
    documentsController.patch
  )
  .delete(validate(DeleteFolderRequestSchema), documentsController.delete);

export default DocumentRoutes;

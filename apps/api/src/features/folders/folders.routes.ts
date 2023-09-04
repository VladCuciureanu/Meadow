import { Router } from "express";

import foldersController from "./folders.controller";
import {
  CreateFolderRequestSchema,
  DeleteFolderRequestSchema,
  GetFolderRequestSchema,
  GetFoldersRequestSchema,
  UpdateFolderRequestSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateFolderAuthority } from "./middlewares/validate-folder-authority";
import { validateFolderExists } from "./middlewares/validate-folder-exists";
import { authenticate } from "../auth/middlewares/authenticate";

const FolderRoutes = Router();

FolderRoutes.route(`/`)
  .all(authenticate)
  .get(validate(GetFoldersRequestSchema), foldersController.getMany)
  .post(validate(CreateFolderRequestSchema), foldersController.create);

FolderRoutes.route(`/:folderId`)
  .all(authenticate, validateFolderExists, validateFolderAuthority)
  .get(validate(GetFolderRequestSchema), foldersController.getById)
  .patch(validate(UpdateFolderRequestSchema), foldersController.patch)
  .delete(validate(DeleteFolderRequestSchema), foldersController.delete);

export default FolderRoutes;

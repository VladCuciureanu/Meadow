import { Router } from "express";

import foldersController from "./folders.controller";
import {
  CreateFolderSchema,
  PatchFolderSchema,
  UpdateFolderSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateFolderAuthority } from "./middlewares/validate-folder-authority";
import { validateFolderExists } from "./middlewares/validate-folder-exists";
import { authenticate } from "../auth/middlewares/authenticate";

const FolderRoutes = Router();

FolderRoutes.route(`/`)
  .all(authenticate)
  .get(foldersController.getMany)
  .post(validate(CreateFolderSchema), foldersController.create);

FolderRoutes.route(`/:folderId`)
  .all(authenticate, validateFolderExists, validateFolderAuthority)
  .get(foldersController.getById)
  .put(validate(UpdateFolderSchema), foldersController.put)
  .patch(validate(PatchFolderSchema), foldersController.patch)
  .delete(foldersController.delete);

export default FolderRoutes;

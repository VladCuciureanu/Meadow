import { Router } from "express";

import FoldersMiddleware from "./folders.middleware";
import FoldersController from "./folders.controller";

const FolderRoutes = Router();

FolderRoutes.route(`/folders`);
// .get(FoldersController.listFolders)
// .post(FoldersController.createFolder);

FolderRoutes.param(`folderId`, FoldersMiddleware.extractFolderId);
FolderRoutes.route(`/folders/:folderId`)
  .all(FoldersMiddleware.validateFolderExists)
  .get(FoldersController.getFolderById);
// .delete(FoldersController.removeFolder)
// .put(FoldersController.put)
// .patch(FoldersController.patch);

export default FolderRoutes;

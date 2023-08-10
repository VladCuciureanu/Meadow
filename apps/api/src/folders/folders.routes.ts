import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";

import FoldersMiddleware from "./folders.middleware";
import FoldersController from "./folders.controller";

export class FoldersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "FoldersRoutes");
  }

  configureRoutes() {
    this.app.route(`/folders`);
    // .get(FoldersController.listFolders)
    // .post(FoldersController.createFolder);

    this.app.param(`folderId`, FoldersMiddleware.extractFolderId);
    this.app
      .route(`/folders/:folderId`)
      .all(FoldersMiddleware.validateFolderExists)
      .get(FoldersController.getFolderById);
    // .delete(FoldersController.removeFolder)
    // .put(FoldersController.put)
    // .patch(FoldersController.patch);

    return this.app;
  }
}

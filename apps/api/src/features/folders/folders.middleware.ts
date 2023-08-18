import express from "express";
import debug from "debug";
import FoldersService from "./folders.service";

const log: debug.IDebugger = debug("api:folders:middlewares");

class FoldersMiddleware {
  async validateFolderExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const folder = await FoldersService.readById(req.params.folderId);
    if (folder) {
      next();
    } else {
      res
        .status(404)
        .send({ error: `Folder ${req.params.folderId} not found` });
    }
  }

  async extractFolderId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.folderId;
    next();
  }
}

export default new FoldersMiddleware();

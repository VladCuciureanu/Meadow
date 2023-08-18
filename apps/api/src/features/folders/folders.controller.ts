import express from "express";
import FoldersService from "./folders.service";
import debug from "debug";

const log: debug.IDebugger = debug("api:folders:controller");

class FoldersController {
  // async listFolders(req: express.Request, res: express.Response) {
  //   const folders = await foldersService.list(100, 0);
  //   res.status(200).send(folders);
  // }

  async getFolderById(req: express.Request, res: express.Response) {
    const folder = await FoldersService.readById(req.params.folderId);
    res.status(200).send(folder);
  }

  // async createFolder(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   const folderId = await foldersService.create(req.body);
  //   res.status(201).send({ id: folderId });
  // }

  // async patch(req: express.Request, res: express.Response) {
  //   if (req.body.password) {
  //     req.body.password = await argon2.hash(req.body.password);
  //   }
  //   log(await foldersService.patchById(req.body));
  //   res.status(204).send(``);
  // }

  // async put(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   log(await foldersService.updateById({ id: req.params.folderId, ...req.body }));
  //   res.status(204).send(``);
  // }

  // async removeFolder(req: express.Request, res: express.Response) {
  //   log(await foldersService.deleteById(req.params.folderId));
  //   res.status(204).send(``);
  // }
}

export default new FoldersController();

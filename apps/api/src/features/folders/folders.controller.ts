import express from "express";
import foldersService from "./folders.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
class FoldersController {
  async getMany(req: express.Request, res: express.Response) {
    const user = (req as AuthenticatedRequest).auth.user!;
    const response = await foldersService.getMany(100, 0, user);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await foldersService.getById(req.params.folderId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const response = await foldersService.create(req);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const response = await foldersService.patch(req as any);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const response = await foldersService.put(req as any);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const response = await foldersService.delete(req as any);
    res.status(204).send(response);
  }
}

export default new FoldersController();

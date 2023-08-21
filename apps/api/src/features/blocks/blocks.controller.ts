import express from "express";
import blocksService from "./blocks.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
class BlocksController {
  async getMany(req: express.Request, res: express.Response) {
    const user = (req as AuthenticatedRequest).auth.user!;
    const response = await blocksService.getMany(100, 0, user);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await blocksService.getById(req.params.blockId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const response = await blocksService.create(req);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const response = await blocksService.patch(req as any);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const response = await blocksService.put(req as any);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const response = await blocksService.delete(req as any);
    res.status(204).send(response);
  }
}

export default new BlocksController();

import express from "express";
import blocksService from "./blocks.service";
import {
  CreateBlockDto,
  CreateBlockRequest,
  DeleteBlockDto,
  DeleteBlockRequest,
  PatchBlockDto,
  PatchBlockRequest,
  UpdateBlockDto,
  UpdateBlockRequest,
} from "@meadow/shared";
import { AuthenticatedRequest } from "../auth/interfaces/authenticated-request";
class BlocksController {
  async getMany(req: express.Request, res: express.Response) {
    const user = (req as any as AuthenticatedRequest).user!;
    const response = await blocksService.getMany(100, 0, user);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await blocksService.getById(req.params.blockId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const dto = new CreateBlockDto(req as CreateBlockRequest);
    const response = await blocksService.create(dto);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const dto = new PatchBlockDto(req as any as PatchBlockRequest);
    const response = await blocksService.patch(dto);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const dto = new UpdateBlockDto(req as any as UpdateBlockRequest);
    const response = await blocksService.put(dto);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const dto = new DeleteBlockDto(req as any as DeleteBlockRequest);
    const response = await blocksService.delete(dto);
    res.status(204).send(response);
  }
}

export default new BlocksController();

import express from "express";
import blocksService from "./blocks.service";
import {
  CreateBlockRequestSchema,
  DeleteBlockRequestSchema,
  GetBlockRequestSchema,
  GetBlocksRequestSchema,
  UpdateBlockRequestSchema,
} from "@meadow/shared";
import { extractUser } from "../auth/utils/extract-user";
class BlocksController {
  async getMany(req: express.Request, res: express.Response) {
    const schema = GetBlocksRequestSchema.parse(req);
    const currentUser = extractUser(req);

    const response = await blocksService.getBlocks(
      {
        limit: schema.body.limit,
        page: schema.body.page,
      },
      currentUser
    );

    return res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const schema = GetBlockRequestSchema.parse(req);

    const response = await blocksService.getBlockById({
      id: schema.params.blockId,
    });

    return res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const schema = CreateBlockRequestSchema.parse(req);

    const response = await blocksService.createBlock({
      title: schema.body.title,
      authorId: schema.body.authorId,
      folderId: schema.body.folderId,
    });

    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const schema = UpdateBlockRequestSchema.parse(req);

    const response = await blocksService.updateBlock({
      id: schema.params.blockId,
      title: schema.body.title,
      authorId: schema.body.authorId,
      folderId: schema.body.folderId,
    });

    res.status(200).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const schema = DeleteBlockRequestSchema.parse(req);

    await blocksService.deleteBlock({ id: schema.params.blockId });

    res.status(204);
  }
}

export default new BlocksController();

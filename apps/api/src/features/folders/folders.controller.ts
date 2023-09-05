import express from "express";
import foldersService from "./folders.service";
import {
  CreateFolderRequestSchema,
  DeleteFolderRequestSchema,
  GetFolderRequestSchema,
  GetFoldersRequestSchema,
  UpdateFolderRequestSchema,
} from "@meadow/shared";
import { extractUser } from "../auth/utils/extract-user";
class FoldersController {
  async getMany(req: express.Request, res: express.Response) {
    const schema = GetFoldersRequestSchema.parse(req);
    const currentUser = extractUser(req);

    const response = await foldersService.getFolders(
      {
        limit: schema.body.limit,
        page: schema.body.page,
      },
      currentUser
    );

    return res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const schema = GetFolderRequestSchema.parse(req);

    const response = await foldersService.getFolderById({
      id: schema.params.folderId,
    });

    return res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const schema = CreateFolderRequestSchema.parse(req);

    const response = await foldersService.createFolder({
      name: schema.body.name,
      icon: {
        tintColor: schema.body.icon.tintColor,
        type: schema.body.icon.type,
        value: schema.body.icon.value,
      },
      spaceId: schema.body.spaceId,
      description: schema.body.description,
      parentFolderId: schema.body.parentFolderId,
    });

    return res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const schema = UpdateFolderRequestSchema.parse(req);

    const response = await foldersService.updateFolder({
      id: schema.params.folderId,
      name: schema.body.name,
      description: schema.body.description,
      icon: {
        tintColor: schema.body.icon?.tintColor,
        type: schema.body.icon?.type,
        value: schema.body.icon?.value,
      },
      parentFolderId: schema.body.parentFolderId,
      spaceId: schema.body.spaceId,
    });

    return res.status(200).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const schema = DeleteFolderRequestSchema.parse(req);

    await foldersService.deleteFolder({ id: schema.params.folderId });

    res.status(204);
  }
}

export default new FoldersController();

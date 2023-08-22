import express from "express";
import foldersService from "./folders.service";
import {
  CreateFolderDto,
  CreateFolderRequest,
  DeleteFolderDto,
  DeleteFolderRequest,
  PatchFolderDto,
  PatchFolderRequest,
  UpdateFolderDto,
  UpdateFolderRequest,
} from "@meadow/shared";
import { AuthenticatedRequest } from "../auth/interfaces/authenticated-request";
class FoldersController {
  async getMany(req: express.Request, res: express.Response) {
    const user = (req as any as AuthenticatedRequest).user!;
    const response = await foldersService.getMany(100, 0, user);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await foldersService.getById(req.params.folderId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const dto = new CreateFolderDto(req as CreateFolderRequest);
    const response = await foldersService.create(dto);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const dto = new PatchFolderDto(req as any as PatchFolderRequest);
    const response = await foldersService.patch(dto);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const dto = new UpdateFolderDto(req as any as UpdateFolderRequest);
    const response = await foldersService.put(dto);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const dto = new DeleteFolderDto(req as any as DeleteFolderRequest);
    const response = await foldersService.delete(dto);
    res.status(204).send(response);
  }
}

export default new FoldersController();

import express from "express";
import spacesService from "./spaces.service";
import {
  CreateSpaceDto,
  DeleteSpaceDto,
  DeleteSpaceRequest,
  PatchSpaceDto,
  PatchSpaceRequest,
  UpdateSpaceDto,
  UpdateSpaceRequest,
} from "@meadow/shared";
class SpacesController {
  async getMany(req: express.Request, res: express.Response) {
    const response = await spacesService.getMany(100, 0);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await spacesService.getById(req.params.spaceId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const dto = new CreateSpaceDto(req);
    const response = await spacesService.create(dto);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const dto = new PatchSpaceDto(req as any as PatchSpaceRequest);
    const response = await spacesService.patch(dto);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const dto = new UpdateSpaceDto(req as any as UpdateSpaceRequest);
    const response = await spacesService.put(dto);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const dto = new DeleteSpaceDto(req as any as DeleteSpaceRequest);
    const response = await spacesService.delete(dto);
    res.status(204).send(response);
  }
}

export default new SpacesController();

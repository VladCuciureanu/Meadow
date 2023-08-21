import express from "express";
import spacesService from "./spaces.service";
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
    const response = await spacesService.create(req);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const response = await spacesService.patch(req as any);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const response = await spacesService.put(req as any);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const response = await spacesService.delete(req as any);
    res.status(204).send(response);
  }
}

export default new SpacesController();

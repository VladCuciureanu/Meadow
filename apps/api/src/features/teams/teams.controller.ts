import express from "express";
import teamsService from "./teams.service";
class TeamsController {
  async getMany(req: express.Request, res: express.Response) {
    const response = await teamsService.getMany(100, 0);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await teamsService.getById(req.params.teamId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const response = await teamsService.create(req);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const response = await teamsService.patch(req as any);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const response = await teamsService.put(req as any);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const response = await teamsService.delete(req as any);
    res.status(204).send(response);
  }
}

export default new TeamsController();

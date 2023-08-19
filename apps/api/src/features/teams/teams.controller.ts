import express from "express";
import teamsService from "./teams.service";
class TeamsController {
  async getMany(req: express.Request, res: express.Response) {
    const teams = await teamsService.getMany(100, 0);
    res.status(200).send(teams);
  }

  async getById(req: express.Request, res: express.Response) {
    const team = await teamsService.getById(req.params.teamId);
    res.status(200).send(team);
  }

  async create(req: express.Request, res: express.Response) {
    const team = await teamsService.create(req);
    res.status(201).send(team);
  }

  async patch(req: express.Request, res: express.Response) {
    const patchedTeam = await teamsService.patch(req as any);
    res.status(204).send(patchedTeam);
  }

  async put(req: express.Request, res: express.Response) {
    const updatedTeam = await teamsService.put(req as any);
    res.status(204).send(updatedTeam);
  }

  async delete(req: express.Request, res: express.Response) {
    const deletedTeam = await teamsService.delete(req as any);
    res.status(204).send(deletedTeam);
  }
}

export default new TeamsController();

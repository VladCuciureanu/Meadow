import express from "express";
import teamsService from "./teams.service";
import debug from "debug";

const log: debug.IDebugger = debug("api:teams:controller");

class TeamsController {
  async listTeams(req: express.Request, res: express.Response) {
    const teams = await teamsService.list(100, 0);
    res.status(200).send(teams);
  }

  async getTeamById(req: express.Request, res: express.Response) {
    const team = await teamsService.readById(req.params.teamId);
    res.status(200).send(team);
  }

  // async createTeam(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   const teamId = await teamsService.create(req.body);
  //   res.status(201).send({ id: teamId });
  // }

  // async patch(req: express.Request, res: express.Response) {
  //   if (req.body.password) {
  //     req.body.password = await argon2.hash(req.body.password);
  //   }
  //   log(await teamsService.patchById(req.body));
  //   res.status(204).send(``);
  // }

  // async put(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   log(await teamsService.updateById({ id: req.params.teamId, ...req.body }));
  //   res.status(204).send(``);
  // }

  // async removeTeam(req: express.Request, res: express.Response) {
  //   log(await teamsService.deleteById(req.params.teamId));
  //   res.status(204).send(``);
  // }
}

export default new TeamsController();

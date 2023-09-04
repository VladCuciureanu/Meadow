import express from "express";
import teamsService from "./teams.service";
import {
  CreateTeamDto,
  CreateTeamRequest,
  DeleteTeamDto,
  DeleteTeamRequest,
  PatchTeamDto,
  PatchTeamRequest,
  UpdateTeamDto,
  UpdateTeamRequest,
} from "@meadow/shared";
import { AuthenticatedRequest } from "../auth/interfaces/authenticated-request";
class TeamsController {
  async getMany(req: express.Request, res: express.Response) {
    const response = await teamsService.getTeams(100, 0);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await teamsService.getTeamById(req.params.teamId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const user = (req as any as AuthenticatedRequest).user;
    const dto = new CreateTeamDto(req as CreateTeamRequest, user);
    const response = await teamsService.createTeam(dto);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const dto = new PatchTeamDto(req as any as PatchTeamRequest);
    const response = await teamsService.updateTeam(dto);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const dto = new UpdateTeamDto(req as any as UpdateTeamRequest);
    const response = await teamsService.put(dto);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const dto = new DeleteTeamDto(req as any as DeleteTeamRequest);
    const response = await teamsService.deleteTeam(dto);
    res.status(204).send(response);
  }
}

export default new TeamsController();

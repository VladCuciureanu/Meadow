import express from "express";
import teamsService from "./teams.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
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
    const user = (req as AuthenticatedRequest).user;
    const dto = new CreateTeamDto(req as CreateTeamRequest, user);
    const response = await teamsService.create(dto);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const dto = new PatchTeamDto(req as any as PatchTeamRequest);
    const response = await teamsService.patch(dto);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const dto = new UpdateTeamDto(req as any as UpdateTeamRequest);
    const response = await teamsService.put(dto);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const dto = new DeleteTeamDto(req as any as DeleteTeamRequest);
    const response = await teamsService.delete(dto);
    res.status(204).send(response);
  }
}

export default new TeamsController();

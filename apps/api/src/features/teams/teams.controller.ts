import express from "express";
import teamsService from "./teams.service";
import {
  CreateTeamRequestSchema,
  DeleteTeamRequestSchema,
  GetTeamRequestSchema,
  GetTeamsRequestSchema,
  UpdateTeamRequestSchema,
} from "@meadow/shared";
import { extractUser } from "../auth/utils/extract-user";
class TeamsController {
  async getMany(req: express.Request, res: express.Response) {
    const schema = GetTeamsRequestSchema.parse(req);
    const currentUser = extractUser(req);

    const response = await teamsService.getTeams(
      {
        limit: schema.body.limit,
        page: schema.body.page,
      },
      currentUser
    );

    return res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const schema = GetTeamRequestSchema.parse(req);

    const response = await teamsService.getTeamById({
      id: schema.params.teamId,
    });

    return res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const schema = CreateTeamRequestSchema.parse(req);
    const currentUser = extractUser(req);

    const response = await teamsService.createTeam(
      {
        name: schema.body.name,
        imgUrl: schema.body.imgUrl,
      },
      currentUser
    );

    return res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const schema = UpdateTeamRequestSchema.parse(req);

    const response = await teamsService.updateTeam({
      id: schema.params.teamId,
      name: schema.body.name,
      imgUrl: schema.body.imgUrl,
    });

    return res.status(200).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const schema = DeleteTeamRequestSchema.parse(req);

    await teamsService.deleteTeam({
      id: schema.params.teamId,
    });

    return res.status(204);
  }
}

export default new TeamsController();

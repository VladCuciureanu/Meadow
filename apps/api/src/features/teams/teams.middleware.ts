import express from "express";
import teamsService from "./teams.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";

class TeamsMiddleware {
  async validateTeamExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const team = await teamsService.getById(req.params.teamId);

    if (team) {
      next();
    } else {
      res.status(404);
    }
  }

  async validateTeamMembership(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const team = await teamsService.getById(req.params.teamId);

    const memberIsPartOfTeam =
      team?.members.find(
        (member) => member.id === (req as AuthenticatedRequest).auth.user.id
      ) !== undefined;

    if (memberIsPartOfTeam) {
      next();
    } else {
      res.sendStatus(403);
    }
  }
}

export default new TeamsMiddleware();

import express from "express";
import spacesService from "./spaces.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
import teamsService from "../teams/teams.service";

class SpacesMiddleware {
  async validateSpaceExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const space = await spacesService.getById(req.params.spaceId);

    if (space) {
      next();
    } else {
      res.status(404);
    }
  }

  // TODO: Cache
  async validateSpaceAuthority(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const space = await spacesService.getById(req.params.spaceId);
    const team = await teamsService.getById(space!.teamId);

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

export default new SpacesMiddleware();

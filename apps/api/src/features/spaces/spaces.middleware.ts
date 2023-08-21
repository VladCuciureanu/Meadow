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
    spacesService.getById(req.params.spaceId).then((space) => {
      if (space) {
        next();
      } else {
        res.status(404);
      }
    });
  }

  validateSpaceAuthority(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    spacesService.getById(req.params.spaceId).then((space) => {
      if (!space) {
        res.sendStatus(403);
        return;
      }

      teamsService.getById(space.teamId).then((team) => {
        if (
          team?.members.find(
            (member) => member.id === (req as AuthenticatedRequest).user.id
          )
        ) {
          next();
        } else {
          res.sendStatus(403);
        }
      });
    });
  }
}

export default new SpacesMiddleware();

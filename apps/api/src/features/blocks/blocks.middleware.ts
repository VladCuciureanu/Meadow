import express from "express";
import blocksService from "./blocks.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
import teamsService from "../teams/teams.service";
import spacesService from "../spaces/spaces.service";

class BlocksMiddleware {
  async validateBlockExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const block = await blocksService.getById(req.params.blockId);

    if (block) {
      next();
    } else {
      res.sendStatus(404);
    }
  }

  // TODO: Cache
  async validateBlockAuthority(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const block = await blocksService.getById(req.params.blockId);
    const space = await spacesService.getById(block!.spaceId);
    const team = await teamsService.getById(space!.teamId);

    const memberIsPartOfTeam =
      team?.members.find(
        (member) => member.id === (req as AuthenticatedRequest).user.id
      ) !== undefined;

    if (memberIsPartOfTeam) {
      next();
    } else {
      res.sendStatus(403);
    }
  }
}

export default new BlocksMiddleware();

import express from "express";
import foldersService from "./folders.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
import teamsService from "../teams/teams.service";
import spacesService from "../spaces/spaces.service";

class FoldersMiddleware {
  async validateFolderExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const folder = await foldersService.getById(req.params.folderId);

    if (folder) {
      next();
    } else {
      res.sendStatus(404);
    }
  }

  // TODO: Cache
  async validateFolderAuthority(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const folder = await foldersService.getById(req.params.folderId);
    const space = await spacesService.getById(folder!.spaceId);
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

export default new FoldersMiddleware();

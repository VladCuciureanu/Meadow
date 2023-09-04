import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import spacesService from "../../spaces/spaces.service";
import teamsService from "../../teams/teams.service";
import foldersService from "../folders.service";

// TODO: Cache
export async function validateFolderAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const folder = await foldersService.getById(req.params.folderId);
  const space = await spacesService.getSpaceById(folder!.spaceId);
  const team = await teamsService.getTeamById(space!.teamId);

  const memberIsPartOfTeam =
    team?.members.find(
      (member) => member.id === (req as any as AuthenticatedRequest).user.id
    ) !== undefined;

  if (memberIsPartOfTeam) {
    next();
  } else {
    res.sendStatus(403);
  }
}

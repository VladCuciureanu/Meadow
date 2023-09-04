import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import spacesService from "../../spaces/spaces.service";
import teamsService from "../../teams/teams.service";
import blocksService from "../blocks.service";

// TODO: Cache
export async function validateBlockAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const block = await blocksService.getById(req.params.blockId);
  const space = await spacesService.getSpaceById(block!.spaceId);
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

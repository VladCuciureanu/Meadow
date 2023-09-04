import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import teamsService from "../../teams/teams.service";
import spacesService from "../spaces.service";

// TODO: Cache
export async function validateSpaceAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const space = await spacesService.getSpaceById({ id: req.params.id });
  const team = await teamsService.getTeamById({ id: space!.team.id });

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

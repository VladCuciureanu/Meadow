import express from "express";
import teamsService from "../teams.service";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";

export async function validateTeamMembership(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const team = await teamsService.getTeamById(req.params.teamId);

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

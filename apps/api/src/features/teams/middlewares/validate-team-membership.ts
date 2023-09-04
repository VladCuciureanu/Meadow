import express from "express";
import teamsService from "../teams.service";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";

export async function validateTeamMembership(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const team = await teamsService.getTeamById({ id: req.params.teamId });

  const currentUser = (req as AuthenticatedRequest).user;

  const memberIsPartOfTeam =
    team?.members.find((member) => member.id === currentUser.id) !== undefined;

  if (memberIsPartOfTeam) {
    next();
  } else {
    res.sendStatus(403);
  }
}

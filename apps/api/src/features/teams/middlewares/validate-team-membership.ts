import express from "express";
import teamsService from "../teams.service";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import { HasTeamIdSchema } from "@meadow/shared";

export async function validateTeamMembership(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasTeamIdSchema.parse(req);
  const currentUser = (req as AuthenticatedRequest).user;

  const userIsPartOfTeam = await teamsService.isUserInTeam(
    schema.params.teamId,
    currentUser
  );

  if (userIsPartOfTeam) {
    next();
  } else {
    res.sendStatus(403);
  }
}

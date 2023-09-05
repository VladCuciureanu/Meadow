import express from "express";
import teamsService from "../teams.service";
import { HasTeamIdSchema } from "@meadow/shared";
import { extractUser } from "../../auth/utils/extract-user";

export async function validateTeamMembership(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasTeamIdSchema.parse(req);
  const currentUser = extractUser(req);

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

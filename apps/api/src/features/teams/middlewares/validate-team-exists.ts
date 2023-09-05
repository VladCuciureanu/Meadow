import express from "express";
import teamsService from "../teams.service";
import { HasTeamIdSchema } from "@meadow/shared";

export async function validateTeamExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasTeamIdSchema.parse(req);
  const team = await teamsService.getTeamById({ id: schema.params.teamId });

  if (team) {
    next();
  } else {
    res.sendStatus(404);
  }
}

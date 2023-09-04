import express from "express";
import teamsService from "../teams.service";

export async function validateTeamExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const team = await teamsService.getTeamById(req.params.teamId);

  if (team) {
    next();
  } else {
    res.sendStatus(404);
  }
}

import express from "express";
import { extractUser } from "../../auth/utils/extract-user";
import teamsService from "../../teams/teams.service";
import { MutableSpaceFields } from "@meadow/shared";

export async function validateSpaceTeamAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const body = MutableSpaceFields.deepPartial().parse(req.body);
  const currentUser = extractUser(req);

  if (body.teamId === undefined) {
    return next();
  }

  const userHasAuthority = await teamsService.isUserInTeam(
    body.teamId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    return res.sendStatus(403);
  }
}

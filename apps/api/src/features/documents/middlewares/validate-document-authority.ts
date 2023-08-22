import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import spacesService from "../../spaces/spaces.service";
import teamsService from "../../teams/teams.service";
import documentsService from "../documents.service";

// TODO: Cache
export async function validateDocumentAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const document = await documentsService.getById(req.params.documentId);
  const space = await spacesService.getById(document!.spaceId);
  const team = await teamsService.getById(space!.teamId);

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

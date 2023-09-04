import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import spacesService from "../../spaces/spaces.service";
import teamsService from "../../teams/teams.service";
import documentsService from "../documents.service";
import foldersService from "../../folders/folders.service";

// TODO: Cache
export async function validateDocumentAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const document = await documentsService.getDocumentById({
    id: req.params.id,
  });
  const folder = await foldersService.getFolderById({
    id: document!.folder.id,
  });
  const space = await spacesService.getSpaceById({ id: folder!.space.id });
  const team = await teamsService.getTeamById({ id: space!.team.id });

  const memberIsPartOfTeam =
    team?.members.find(
      (member) => member.id === (req as AuthenticatedRequest).user.id
    ) !== undefined;

  if (memberIsPartOfTeam) {
    next();
  } else {
    res.sendStatus(403);
  }
}

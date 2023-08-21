import express from "express";
import documentsService from "./documents.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
import teamsService from "../teams/teams.service";
import spacesService from "../spaces/spaces.service";

class DocumentsMiddleware {
  async validateDocumentExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const document = await documentsService.getById(req.params.documentId);

    if (document) {
      next();
    } else {
      res.status(404);
    }
  }

  // TODO: Cache
  async validateDocumentAuthority(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const document = await documentsService.getById(req.params.documentId);
    const space = await spacesService.getById(document!.spaceId);
    const team = await teamsService.getById(space!.teamId);

    const memberIsPartOfTeam =
      team?.members.find(
        (member) => member.id === (req as AuthenticatedRequest).auth.user.id
      ) !== undefined;

    if (memberIsPartOfTeam) {
      next();
    } else {
      res.sendStatus(403);
    }
  }
}

export default new DocumentsMiddleware();

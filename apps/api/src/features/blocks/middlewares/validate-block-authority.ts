import express from "express";
import { AuthenticatedRequest } from "../../auth/interfaces/authenticated-request";
import blocksService from "../blocks.service";
import { HasBlockIdSchema } from "@meadow/shared";

export async function validateBlockAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasBlockIdSchema.parse(req);
  const currentUser = (req as AuthenticatedRequest).user;

  const userHasAuthority = await blocksService.isUserAuthorized(
    schema.params.blockId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    res.sendStatus(403);
  }
}

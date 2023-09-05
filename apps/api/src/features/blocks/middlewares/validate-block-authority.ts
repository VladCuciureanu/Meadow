import express from "express";
import blocksService from "../blocks.service";
import { HasBlockIdSchema } from "@meadow/shared";
import { extractUser } from "../../auth/utils/extract-user";

export async function validateBlockAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasBlockIdSchema.parse(req);
  const currentUser = extractUser(req);

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

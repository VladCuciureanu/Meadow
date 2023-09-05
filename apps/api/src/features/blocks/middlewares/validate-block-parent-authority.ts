import express from "express";
import { extractUser } from "../../auth/utils/extract-user";
import { MutableBlockFields } from "@meadow/shared";
import blocksService from "../blocks.service";

export async function validateBlockParentAuthority(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const body = MutableBlockFields.deepPartial().parse(req.body);
  const currentUser = extractUser(req);

  if (body.parentBlockId === undefined) {
    return next();
  }

  const userHasAuthority = await blocksService.isUserAuthorized(
    body.parentBlockId,
    currentUser
  );

  if (userHasAuthority) {
    next();
  } else {
    return res.sendStatus(403);
  }
}

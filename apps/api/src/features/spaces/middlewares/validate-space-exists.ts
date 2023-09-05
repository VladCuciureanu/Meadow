import express from "express";
import spacesService from "../spaces.service";
import { HasSpaceIdSchema } from "@meadow/shared";

export async function validateSpaceExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasSpaceIdSchema.parse(req);
  const space = await spacesService.getSpaceById({ id: schema.params.spaceId });

  if (space) {
    next();
  } else {
    res.sendStatus(404);
  }
}

import express from "express";
import spacesService from "../spaces.service";

export async function validateSpaceExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const space = await spacesService.getById(req.params.spaceId);

  if (space) {
    next();
  } else {
    res.sendStatus(404);
  }
}

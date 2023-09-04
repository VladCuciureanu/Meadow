import express from "express";
import spacesService from "../spaces.service";

export async function validateSpaceExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const space = await spacesService.getSpaceById({ id: req.params.id });

  if (space) {
    next();
  } else {
    res.sendStatus(404);
  }
}

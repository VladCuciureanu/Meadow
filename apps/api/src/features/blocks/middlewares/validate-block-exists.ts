import express from "express";
import blocksService from "../blocks.service";

export async function validateBlockExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const block = await blocksService.getById(req.params.blockId);

  if (block) {
    next();
  } else {
    res.sendStatus(404);
  }
}

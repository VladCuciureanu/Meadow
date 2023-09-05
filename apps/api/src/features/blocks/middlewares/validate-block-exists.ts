import express from "express";
import blocksService from "../blocks.service";
import { HasBlockIdSchema } from "@meadow/shared";

export async function validateBlockExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasBlockIdSchema.parse(req);
  const block = await blocksService.getBlockById({ id: schema.params.blockId });

  if (block) {
    next();
  } else {
    res.sendStatus(404);
  }
}

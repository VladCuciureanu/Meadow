import express from "express";
import foldersService from "../folders.service";
import { HasFolderIdSchema } from "@meadow/shared";

export async function validateFolderExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const schema = HasFolderIdSchema.parse(req);
  const folder = await foldersService.getFolderById({
    id: schema.params.folderId,
  });

  if (folder) {
    next();
  } else {
    res.sendStatus(404);
  }
}

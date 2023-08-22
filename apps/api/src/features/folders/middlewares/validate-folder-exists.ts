import express from "express";
import foldersService from "../folders.service";

export async function validateFolderExists(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const folder = await foldersService.getById(req.params.folderId);

  if (folder) {
    next();
  } else {
    res.sendStatus(404);
  }
}

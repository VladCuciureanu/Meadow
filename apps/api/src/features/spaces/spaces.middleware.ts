import express from "express";
import SpacesService from "./spaces.service";

class SpacesMiddleware {
  async validateSpaceExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const space = await SpacesService.readById(req.params.spaceId);
    if (space) {
      next();
    } else {
      res.status(404).send({ error: `Space ${req.params.spaceId} not found` });
    }
  }

  async extractSpaceId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.spaceId;
    next();
  }
}

export default new SpacesMiddleware();

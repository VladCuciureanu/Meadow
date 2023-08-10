import express from "express";
import debug from "debug";
import BlocksService from "./blocks.service";

const log: debug.IDebugger = debug("api:blocks:middlewares");

class BlocksMiddleware {
  async validateBlockExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const block = await BlocksService.readById(req.params.blockId);
    if (block) {
      next();
    } else {
      res.status(404).send({ error: `Block ${req.params.blockId} not found` });
    }
  }

  async extractBlockId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.blockId;
    next();
  }
}

export default new BlocksMiddleware();

import express from "express";
import BlocksService from "./blocks.service";
import debug from "debug";

const log: debug.IDebugger = debug("api:blocks:controller");

class BlocksController {
  // async listBlocks(req: express.Request, res: express.Response) {
  //   const blocks = await blocksService.list(100, 0);
  //   res.status(200).send(blocks);
  // }

  async getBlockById(req: express.Request, res: express.Response) {
    const block = await BlocksService.readById(req.params.blockId);
    res.status(200).send(block);
  }

  // async createBlock(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   const blockId = await blocksService.create(req.body);
  //   res.status(201).send({ id: blockId });
  // }

  // async patch(req: express.Request, res: express.Response) {
  //   if (req.body.password) {
  //     req.body.password = await argon2.hash(req.body.password);
  //   }
  //   log(await blocksService.patchById(req.body));
  //   res.status(204).send(``);
  // }

  // async put(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   log(await blocksService.updateById({ id: req.params.blockId, ...req.body }));
  //   res.status(204).send(``);
  // }

  // async removeBlock(req: express.Request, res: express.Response) {
  //   log(await blocksService.deleteById(req.params.blockId));
  //   res.status(204).send(``);
  // }
}

export default new BlocksController();

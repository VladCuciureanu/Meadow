import express from "express";
import SpacesService from "./spaces.service";

class SpacesController {
  // async listSpaces(req: express.Request, res: express.Response) {
  //   const spaces = await spacesService.list(100, 0);
  //   res.status(200).send(spaces);
  // }

  async getSpaceById(req: express.Request, res: express.Response) {
    const space = await SpacesService.readById(req.params.spaceId);
    res.status(200).send(space);
  }

  // async createSpace(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   const spaceId = await spacesService.create(req.body);
  //   res.status(201).send({ id: spaceId });
  // }

  // async patch(req: express.Request, res: express.Response) {
  //   if (req.body.password) {
  //     req.body.password = await argon2.hash(req.body.password);
  //   }
  //   log(await spacesService.patchById(req.body));
  //   res.status(204).send(``);
  // }

  // async put(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   log(await spacesService.updateById({ id: req.params.spaceId, ...req.body }));
  //   res.status(204).send(``);
  // }

  // async removeSpace(req: express.Request, res: express.Response) {
  //   log(await spacesService.deleteById(req.params.spaceId));
  //   res.status(204).send(``);
  // }
}

export default new SpacesController();

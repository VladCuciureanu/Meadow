import express from "express";
import spacesService from "./spaces.service";
import {
  CreateSpaceRequestSchema,
  DeleteSpaceRequestSchema,
  GetSpaceRequestSchema,
  GetSpacesRequestSchema,
  UpdateSpaceRequestSchema,
} from "@meadow/shared";
class SpacesController {
  async getMany(req: express.Request, res: express.Response) {
    const schema = GetSpacesRequestSchema.parse(req);

    const response = await spacesService.getMany({
      limit: schema.body.limit,
      page: schema.body.page,
    });

    return res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const schema = GetSpaceRequestSchema.parse(req);

    const response = await spacesService.getById({ id: schema.params.spaceId });

    return res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const schema = CreateSpaceRequestSchema.parse(req);

    const response = await spacesService.create({
      name: schema.body.name,
      imgUrl: schema.body.imgUrl,
      teamId: schema.body.teamId,
    });

    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const schema = UpdateSpaceRequestSchema.parse(req);

    const response = await spacesService.put({
      id: schema.params.id,
      name: schema.body.name,
      imgUrl: schema.body.imgUrl,
      teamId: schema.body.teamId,
    });

    res.status(200).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const schema = DeleteSpaceRequestSchema.parse(req);

    await spacesService.delete({ id: schema.params.id });

    res.status(204);
  }
}

export default new SpacesController();

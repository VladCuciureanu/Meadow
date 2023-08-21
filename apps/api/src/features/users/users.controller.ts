import express from "express";
import usersService from "./users.service";

class UsersController {
  async getMany(req: express.Request, res: express.Response) {
    const response = await usersService.getMany(100, 0);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await usersService.getById(req.params.userId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const response = await usersService.create(req);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const response = await usersService.patch(req as any);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const response = await usersService.put(req as any);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const response = await usersService.delete(req.params.userId);
    res.status(204).send(response);
  }
}

export default new UsersController();

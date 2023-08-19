import express from "express";
import usersService from "./users.service";

class UsersController {
  async getMany(req: express.Request, res: express.Response) {
    const users = await usersService.getMany(100, 0);
    res.status(200).send(users);
  }

  async getById(req: express.Request, res: express.Response) {
    const user = await usersService.getById(req.params.userId);
    res.status(200).send(user);
  }

  async create(req: express.Request, res: express.Response) {
    const user = await usersService.create(req);
    res.status(201).send(user);
  }

  async patch(req: express.Request, res: express.Response) {
    await usersService.patch(req as any);
    res.status(204).send(``);
  }

  async put(req: express.Request, res: express.Response) {
    await usersService.put(req as any);
    res.status(204).send(``);
  }

  async delete(req: express.Request, res: express.Response) {
    await usersService.delete(req.params.userId);
    res.status(204).send(``);
  }
}

export default new UsersController();

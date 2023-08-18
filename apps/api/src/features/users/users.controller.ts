import express from "express";
import usersService from "./users.service";
import { TypeOf } from "zod";
import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
} from "@meadow/shared";

class UsersController {
  async get(req: express.Request, res: express.Response) {
    const users = await usersService.getAll(100, 0);
    res.status(200).send(users);
  }

  async getById(req: express.Request, res: express.Response) {
    const user = await usersService.getById(req.params.userId);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    const user = await usersService.create(
      req as any as TypeOf<typeof CreateUserSchema>
    );
    res.status(201).send(user);
  }

  async patch(req: express.Request, res: express.Response) {
    await usersService.patchById(req as any as TypeOf<typeof PatchUserSchema>);
    res.status(204).send(``);
  }

  async put(req: express.Request, res: express.Response) {
    await usersService.updateById(
      req as any as TypeOf<typeof UpdateUserSchema>
    );
    res.status(204).send(``);
  }

  async delete(req: express.Request, res: express.Response) {
    // log(await usersService.deleteById(req.params.userId));
    res.status(204).send(``);
  }
}

export default new UsersController();

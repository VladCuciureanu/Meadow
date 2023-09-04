import express from "express";
import usersService from "./users.service";
import {
  CreateUserRequestSchema,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
  GetUsersRequestSchema,
  UpdateUserRequestSchema,
} from "@meadow/shared";
import { z } from "zod";

class UsersController {
  async getMany(
    req: z.infer<typeof GetUsersRequestSchema>,
    res: express.Response
  ) {
    const response = await usersService.getUsers({
      limit: req.body.limit ?? 100,
      page: req.body.page ?? 1,
    });

    res.status(200).send(response);
  }

  async getById(
    req: z.infer<typeof GetUserRequestSchema>,
    res: express.Response
  ) {
    const response = await usersService.getUserById(
      { id: req.params.id },
      (req as any).user
    );

    res.status(200).send(response);
  }

  async create(
    req: z.infer<typeof CreateUserRequestSchema>,
    res: express.Response
  ) {
    const response = await usersService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      imgUrl: req.body.imgUrl,
    });

    res.status(201).send(response);
  }

  async patch(
    req: z.infer<typeof UpdateUserRequestSchema>,
    res: express.Response
  ) {
    const response = await usersService.updateUser({
      id: req.params.id,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      imgUrl: req.body.imgUrl,
    });

    res.status(204).send(response);
  }

  async delete(
    req: z.infer<typeof DeleteUserRequestSchema>,
    res: express.Response
  ) {
    const response = await usersService.deleteUser({ id: req.params.id });

    res.status(204).send(response);
  }
}

export default new UsersController();

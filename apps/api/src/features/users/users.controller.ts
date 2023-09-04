import express from "express";
import usersService from "./users.service";
import {
  CreateUserRequestSchema,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
  GetUsersRequestSchema,
  UpdateUserRequestSchema,
} from "@meadow/shared";
import { AuthenticatedRequest } from "../auth/interfaces/authenticated-request";

class UsersController {
  async getMany(req: express.Request, res: express.Response) {
    const schema = GetUsersRequestSchema.parse(req);

    const response = await usersService.getUsers({
      limit: schema.body.limit,
      page: schema.body.page,
    });

    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const schema = GetUserRequestSchema.parse(req);
    const currentUser = (req as AuthenticatedRequest).user;

    const response = await usersService.getUserById(
      { id: schema.params.id },
      currentUser
    );

    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const schema = CreateUserRequestSchema.parse(req);

    const response = await usersService.createUser({
      email: schema.body.email,
      firstName: schema.body.firstName,
      lastName: schema.body.lastName,
      password: schema.body.password,
      imgUrl: schema.body.imgUrl,
    });

    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const schema = UpdateUserRequestSchema.parse(req);

    const response = await usersService.updateUser({
      id: schema.params.id,
      email: schema.body.email,
      firstName: schema.body.firstName,
      lastName: schema.body.lastName,
      password: schema.body.password,
      imgUrl: schema.body.imgUrl,
    });

    res.status(200).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const schema = DeleteUserRequestSchema.parse(req);

    await usersService.deleteUser({ id: schema.params.id });

    res.status(204);
  }
}

export default new UsersController();

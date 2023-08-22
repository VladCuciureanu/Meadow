import express from "express";
import usersService from "./users.service";
import {
  CreateUserDto,
  CreateUserRequest,
  DeleteUserDto,
  DeleteUserRequest,
  PatchUserDto,
  PatchUserRequest,
  UpdateUserDto,
  UpdateUserRequest,
} from "@meadow/shared";

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
    const dto = new CreateUserDto(req as CreateUserRequest);
    const response = await usersService.create(dto);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const dto = new PatchUserDto(req as any as PatchUserRequest);
    const response = await usersService.patch(dto);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const dto = new UpdateUserDto(req as any as UpdateUserRequest);
    const response = await usersService.put(dto);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const dto = new DeleteUserDto(req as any as DeleteUserRequest);
    const response = await usersService.delete(dto);
    res.status(204).send(response);
  }
}

export default new UsersController();

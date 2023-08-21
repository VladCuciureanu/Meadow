import express from "express";
import documentsService from "./documents.service";
import { AuthenticatedRequest } from "../auth/auth.interfaces";
class DocumentsController {
  async getMany(req: express.Request, res: express.Response) {
    const user = (req as AuthenticatedRequest).user!;
    const response = await documentsService.getMany(100, 0, user);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await documentsService.getById(req.params.documentId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const response = await documentsService.create(req);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const response = await documentsService.patch(req as any);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const response = await documentsService.put(req as any);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const response = await documentsService.delete(req as any);
    res.status(204).send(response);
  }
}

export default new DocumentsController();

import express from "express";
import documentsService from "./documents.service";
import {
  CreateDocumentDto,
  CreateDocumentRequest,
  DeleteDocumentDto,
  DeleteDocumentRequest,
  PatchDocumentDto,
  PatchDocumentRequest,
  UpdateDocumentDto,
  UpdateDocumentRequest,
} from "@meadow/shared";
import { AuthenticatedRequest } from "../auth/interfaces/authenticated-request";
class DocumentsController {
  async getMany(req: express.Request, res: express.Response) {
    const user = (req as any as AuthenticatedRequest).user!;
    const response = await documentsService.getMany(100, 0, user);
    res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const response = await documentsService.getById(req.params.documentId);
    res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const user = (req as any as AuthenticatedRequest).user!;
    const dto = new CreateDocumentDto(req as CreateDocumentRequest, user);
    const response = await documentsService.create(dto);
    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const dto = new PatchDocumentDto(req as any as PatchDocumentRequest);
    const response = await documentsService.patch(dto);
    res.status(204).send(response);
  }

  async put(req: express.Request, res: express.Response) {
    const dto = new UpdateDocumentDto(req as any as UpdateDocumentRequest);
    const response = await documentsService.put(dto);
    res.status(204).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const dto = new DeleteDocumentDto(req as any as DeleteDocumentRequest);
    const response = await documentsService.delete(dto);
    res.status(204).send(response);
  }
}

export default new DocumentsController();

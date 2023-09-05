import express from "express";
import documentsService from "./documents.service";
import {
  CreateDocumentRequestSchema,
  DeleteDocumentRequestSchema,
  GetDocumentRequestSchema,
  GetDocumentsRequestSchema,
  UpdateDocumentRequestSchema,
} from "@meadow/shared";
import { extractUser } from "../auth/utils/extract-user";
class DocumentsController {
  async getMany(req: express.Request, res: express.Response) {
    const schema = GetDocumentsRequestSchema.parse(req);
    const currentUser = extractUser(req);

    const response = await documentsService.getDocuments(
      {
        limit: schema.body.limit,
        page: schema.body.page,
      },
      currentUser
    );

    return res.status(200).send(response);
  }

  async getById(req: express.Request, res: express.Response) {
    const schema = GetDocumentRequestSchema.parse(req);

    const response = await documentsService.getDocumentById({
      id: schema.params.documentId,
    });

    return res.status(200).send(response);
  }

  async create(req: express.Request, res: express.Response) {
    const schema = CreateDocumentRequestSchema.parse(req);

    const response = await documentsService.createDocument({
      title: schema.body.title,
      authorId: schema.body.authorId,
      folderId: schema.body.folderId,
    });

    res.status(201).send(response);
  }

  async patch(req: express.Request, res: express.Response) {
    const schema = UpdateDocumentRequestSchema.parse(req);

    const response = await documentsService.updateDocument({
      id: schema.params.documentId,
      title: schema.body.title,
      authorId: schema.body.authorId,
      folderId: schema.body.folderId,
    });

    res.status(200).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const schema = DeleteDocumentRequestSchema.parse(req);

    await documentsService.deleteDocument({ id: schema.params.documentId });

    res.status(204);
  }
}

export default new DocumentsController();

import express from "express";
import DocumentsService from "./documents.service";
import debug from "debug";

const log: debug.IDebugger = debug("api:documents:controller");

class DocumentsController {
  // async listDocuments(req: express.Request, res: express.Response) {
  //   const documents = await documentsService.list(100, 0);
  //   res.status(200).send(documents);
  // }

  async getDocumentById(req: express.Request, res: express.Response) {
    const document = await DocumentsService.readById(req.params.documentId);
    res.status(200).send(document);
  }

  // async createDocument(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   const documentId = await documentsService.create(req.body);
  //   res.status(201).send({ id: documentId });
  // }

  // async patch(req: express.Request, res: express.Response) {
  //   if (req.body.password) {
  //     req.body.password = await argon2.hash(req.body.password);
  //   }
  //   log(await documentsService.patchById(req.body));
  //   res.status(204).send(``);
  // }

  // async put(req: express.Request, res: express.Response) {
  //   req.body.password = await argon2.hash(req.body.password);
  //   log(await documentsService.updateById({ id: req.params.documentId, ...req.body }));
  //   res.status(204).send(``);
  // }

  // async removeDocument(req: express.Request, res: express.Response) {
  //   log(await documentsService.deleteById(req.params.documentId));
  //   res.status(204).send(``);
  // }
}

export default new DocumentsController();

import { Repository } from "typeorm";
import { MeadowDataSource } from "../data-source";
import { Document } from "./models/document";

class DocumentsService {
  documentsRepository: Repository<Document>;

  constructor() {
    this.documentsRepository = MeadowDataSource.getRepository(Document);
  }
  // async create(resource: DocumentDto) {
  //   return DocumentsDao.addDocument(resource);
  // }

  // async deleteById(resourceId: string) {
  //   return DocumentsDao.removeDocumentById(resourceId);
  // }

  // async list(limit: number, page: number) {
  //   return DocumentsDao.getDocuments();
  // }

  // async patchById(resource: DocumentDto) {
  //   return DocumentsDao.patchDocumentById(resource);
  // }

  async readById(resourceId: string) {
    return this.documentsRepository.findOne({ where: { id: resourceId } });
  }

  // async updateById(resource: DocumentDto) {
  //   return DocumentsDao.putDocumentById(resource);
  // }

  // async getDocumentByEmail(email: string) {
  //   return DocumentsDao.getDocumentByEmail(email);
  // }
}

export default new DocumentsService();

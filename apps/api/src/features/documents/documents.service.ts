import { Repository } from "typeorm";
import { Document } from "./document.model";
import { MeadowDataSource } from "../../config/typeorm";
import { z } from "zod";
import {
  CreateDocumentSchema,
  DeleteDocumentSchema,
  PatchDocumentSchema,
  UpdateDocumentSchema,
  User,
} from "@meadow/shared";

class DocumentsService {
  documentsRepository: Repository<Document>;

  constructor() {
    this.documentsRepository = MeadowDataSource.getRepository(Document);
  }

  async getMany(limit: number, page: number, user: User) {
    const skipCount = Math.max(0, limit * (page - 1));
    return this.documentsRepository.find({
      take: limit,
      skip: skipCount,
      where: {
        space: {
          team: {
            members: {
              id: user.id,
            },
          },
        },
      },
    });
  }

  async getById(documentId: string) {
    return this.documentsRepository.findOne({
      where: {
        id: documentId,
      },
    });
  }

  async create(dto: z.infer<typeof CreateDocumentSchema>) {
    return this.documentsRepository.create(dto.body);
  }

  async patch(dto: z.infer<typeof PatchDocumentSchema>) {
    return this.documentsRepository.update(
      { id: dto.params.documentId },
      dto.body
    );
  }

  async put(dto: z.infer<typeof UpdateDocumentSchema>) {
    return this.documentsRepository.update(
      { id: dto.params.documentId },
      dto.body
    );
  }

  async delete(dto: z.infer<typeof DeleteDocumentSchema>) {
    return this.documentsRepository.delete({ id: dto.params.documentId });
  }
}

export default new DocumentsService();

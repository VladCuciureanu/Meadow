import { Repository, DeepPartial } from "typeorm";
import { Document } from "./document.model";
import { MeadowDataSource } from "../../config/typeorm";
import blocksService from "../blocks/blocks.service";
import {
  CreateBlockDto,
  CreateDocumentDto,
  DeleteDocumentDto,
  PatchDocumentDto,
  UpdateDocumentDto,
  User,
} from "@meadow/shared";
import { randomUUID } from "crypto";

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
      relations: ["space", "folder", "author", "rootBlock"],
    });
  }

  async getById(documentId: string) {
    return this.documentsRepository.findOne({
      where: {
        id: documentId,
      },
      relations: ["space", "folder", "author", "rootBlock"],
    });
  }

  async create(dto: CreateDocumentDto) {
    const newDocumentId = randomUUID();

    const document = this.documentsRepository.create({
      id: newDocumentId,
      title: dto.title,
      author: {
        id: dto.authorId,
      },
      folder: {
        id: dto.folderId,
      },
      rootBlock: {
        documentId: newDocumentId,
        spaceId: dto.spaceId,
      },
      space: {
        id: dto.spaceId,
      },
      previewUrl: "https://todo.functionality",
    });
    return this.documentsRepository.save(document);
  }

  async patch(dto: PatchDocumentDto) {
    return this.documentsRepository.update(
      { id: dto.id },
      {
        title: dto.title,
        folder: {
          id: dto.folderId,
        },
        rootBlock: {
          id: dto.rootBlockId,
        },
        space: {
          id: dto.spaceId,
        },
      }
    );
  }

  async put(dto: UpdateDocumentDto) {
    return this.documentsRepository.update(
      { id: dto.id },
      {
        title: dto.title,
        folder: {
          id: dto.folderId,
        },
        rootBlock: {
          id: dto.rootBlockId,
        },
        space: {
          id: dto.spaceId,
        },
      }
    );
  }

  async delete(dto: DeleteDocumentDto) {
    return this.documentsRepository.delete({ id: dto.id });
  }
}

export default new DocumentsService();

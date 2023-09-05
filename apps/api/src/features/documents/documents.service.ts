import { ArrayContains, Repository } from "typeorm";
import { DocumentEntity } from "./documents.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateDocumentRequest,
  CreateDocumentResponse,
  DeleteDocumentRequest,
  GetDocumentRequest,
  GetDocumentResponse,
  GetDocumentsResponse,
  GetSpacesRequest,
  UpdateDocumentRequest,
  UpdateDocumentResponse,
  UserDto,
} from "@meadow/shared";
import { DocumentsMapper } from "./documents.mapper";
import spacesService from "../spaces/spaces.service";
import foldersService from "../folders/folders.service";

class DocumentsService {
  documentsRepository: Repository<DocumentEntity>;

  constructor() {
    this.documentsRepository = MeadowDataSource.getRepository(DocumentEntity);
  }

  async getDocuments(
    dto: GetSpacesRequest,
    currentUser: UserDto
  ): Promise<GetDocumentsResponse> {
    const skipCount = dto.limit * (dto.page - 1);

    const entities = await this.documentsRepository.find({
      take: dto.limit,
      skip: skipCount,
      where: {
        folder: {
          space: {
            team: {
              members: ArrayContains([
                {
                  id: currentUser.id,
                },
              ]),
            },
          },
        },
      },
      relations: ["space", "rootBlock", "folder", "author"],
    });

    return entities.map((entity) => DocumentsMapper.toDto(entity));
  }

  async getDocumentById(dto: GetDocumentRequest): Promise<GetDocumentResponse> {
    const entity = await this.documentsRepository.findOne({
      where: { id: dto.id },
    });

    return DocumentsMapper.toDto(entity!);
  }

  async createDocument(
    dto: CreateDocumentRequest
  ): Promise<CreateDocumentResponse> {
    const entity = await this.documentsRepository.save(
      this.documentsRepository.create({
        title: dto.title,
        author: {
          id: dto.authorId,
        },
        folder: {
          id: dto.folderId,
        },
      })
    );

    return DocumentsMapper.toDto(entity);
  }

  async updateDocument(
    dto: UpdateDocumentRequest
  ): Promise<UpdateDocumentResponse> {
    let updatedFields: Record<string, any> = {};

    if (dto.title) {
      updatedFields.title = dto.title;
    }
    if (dto.authorId) {
      updatedFields.author = { id: dto.authorId };
    }
    if (dto.folderId) {
      updatedFields.folder = { id: dto.folderId };
    }

    const updateResponse = await this.documentsRepository.update(
      {
        id: dto.id,
      },
      updatedFields
    );

    const updatedEntity = updateResponse.generatedMaps.at(0) as DocumentEntity;

    return DocumentsMapper.toDto(updatedEntity);
  }

  async deleteDocument(dto: DeleteDocumentRequest) {
    await this.documentsRepository.delete({ id: dto.id });
  }

  async isUserAuthorized(documentId: string, user: UserDto) {
    const document = await this.documentsRepository.findOne({
      where: { id: documentId },
      relations: ["space", "folder"],
    });

    if (!document) {
      return false;
    }

    if (document?.space) {
      return spacesService.isUserAuthorized(document.space.id, user);
    }

    if (document?.folder) {
      return foldersService.isUserAuthorized(document.folder.id, user);
    }
  }
}

export default new DocumentsService();

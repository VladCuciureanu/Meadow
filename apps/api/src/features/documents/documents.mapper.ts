import { PartialDocumentDto, DocumentDto } from "@meadow/shared";
import { DocumentEntity } from "./documents.entity";
import { FoldersMapper } from "../folders/folders.mapper";
import { UsersMapper } from "../users/users.mapper";

export class DocumentsMapper {
  static toDto(entity: DocumentEntity): DocumentDto {
    return {
      id: entity.id,
      title: entity.title,
      previewUrl: entity.previewUrl,
      isEmpty: entity.isEmpty,
      author: UsersMapper.toPartialDto(entity.author),
      folder: entity.folder
        ? FoldersMapper.toPartialDto(entity.folder)
        : undefined,
      rootBlock: BlockMapper, // TODO
      createdAt: entity.createdAt,
      createdBy: UsersMapper.toPartialDto(entity.createdBy),
      modifiedAt: entity.modifiedAt,
      modifiedBy: UsersMapper.toPartialDto(entity.modifiedBy),
    };
  }

  static toPartialDto(entity: DocumentEntity): PartialDocumentDto {
    return {
      id: entity.id,
      title: entity.title,
      previewUrl: entity.previewUrl,
      isEmpty: entity.isEmpty,
      createdAt: entity.createdAt,
      modifiedAt: entity.modifiedAt,
    };
  }
}

import { PartialFolderDto, FolderDto } from "@meadow/shared";
import { FolderEntity } from "./folders.entity";
import { SpacesMapper } from "../spaces/spaces.mapper";
import { UsersMapper } from "../users/users.mapper";
import { DocumentsMapper } from "../documents/documents.mapper";

export class FoldersMapper {
  static toDto(entity: FolderEntity): FolderDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      icon: {
        tintColor: entity.icon.tintColor,
        type: entity.icon.type,
        value: entity.icon.value,
      },
      itemOrder: entity.itemOrder,
      documents: entity.documents.map((document) =>
        DocumentsMapper.toPartialDto(document)
      ),
      parentFolder: entity.parentFolder
        ? FoldersMapper.toPartialDto(entity.parentFolder)
        : undefined,
      childrenFolders: entity.childrenFolders.map((folder) =>
        FoldersMapper.toPartialDto(folder)
      ),
      space: SpacesMapper.toPartialDto(entity.space),
      createdAt: entity.createdAt,
      createdBy: UsersMapper.toPartialDto(entity.createdBy),
      modifiedAt: entity.modifiedAt,
      modifiedBy: UsersMapper.toPartialDto(entity.modifiedBy),
    };
  }

  static toPartialDto(entity: FolderEntity): PartialFolderDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      icon: {
        tintColor: entity.icon.tintColor,
        type: entity.icon.type,
        value: entity.icon.value,
      },
      space: SpacesMapper.toPartialDto(entity.space),
      createdAt: entity.createdAt,
      modifiedAt: entity.modifiedAt,
    };
  }
}

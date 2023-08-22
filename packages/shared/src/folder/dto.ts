import { BaseAuditableEntityDto } from "../common";
import { DocumentDto } from "../document";
import { SpaceDto } from "../space";
import { UserDto } from "../user";

export class FolderDto extends BaseAuditableEntityDto {
  name: string;
  description?: string;
  icon: FolderIconConfig;
  itemOrder: string[];
  documents: DocumentDto[];
  parentFolder?: FolderDto;
  parentFolderId?: string;
  childrenFolders: FolderDto[];
  space: SpaceDto;
  spaceId: string;

  constructor(
    id: string,
    name: string,
    description: string | undefined,
    icon: FolderIconConfig,
    itemOrder: string[],
    documents: DocumentDto[],
    parentFolder: FolderDto | undefined,
    parentFolderId: string | undefined,
    childrenFolders: FolderDto[],
    space: SpaceDto,
    spaceId: string,
    created: Date,
    createdBy: UserDto,
    modified: Date,
    modifiedBy: UserDto
  ) {
    super(id, created, createdBy, modified, modifiedBy);
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.itemOrder = itemOrder;
    this.documents = documents;
    this.parentFolder = parentFolder;
    this.parentFolderId = parentFolderId;
    this.childrenFolders = childrenFolders;
    this.space = space;
    this.spaceId = spaceId;
  }
}

export interface FolderIconConfig {
  tintColor?: string;
  type: FolderIconType;
  value: string;
}

export enum FolderIconType {
  Emoji = "emoji",
  LocalImage = "localImage",
}

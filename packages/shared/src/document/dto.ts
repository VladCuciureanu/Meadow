import { BlockDto } from "../block";
import { BaseAuditableEntityDto } from "../common";
import { FolderDto } from "../folder";
import { SpaceDto } from "../space";
import { UserDto } from "../user";

export class DocumentDto extends BaseAuditableEntityDto {
  title: string;
  previewUrl: string;
  isEmpty: boolean;
  author: UserDto;
  authorId: string;
  space: SpaceDto;
  spaceId: string;
  folder?: FolderDto;
  folderId?: string;
  rootBlock: BlockDto;
  rootBlockId: string;

  constructor(
    id: string,
    title: string,
    previewUrl: string,
    isEmpty: boolean,
    author: UserDto,
    authorId: string,
    space: SpaceDto,
    spaceId: string,
    folder: FolderDto | undefined,
    folderId: string | undefined,
    rootBlock: BlockDto,
    rootBlockId: string,
    created: Date,
    createdBy: UserDto,
    modified: Date,
    modifiedBy: UserDto
  ) {
    super(id, created, createdBy, modified, modifiedBy);
    this.title = title;
    this.previewUrl = previewUrl;
    this.isEmpty = isEmpty;
    this.author = author;
    this.authorId = authorId;
    this.space = space;
    this.spaceId = spaceId;
    this.folder = folder;
    this.folderId = folderId;
    this.rootBlock = rootBlock;
    this.rootBlockId = rootBlockId;
  }
}

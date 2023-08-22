import { BlockDto } from "../block";
import { BaseEntityDto } from "../common";
import { DocumentDto } from "../document";
import { FolderDto } from "../folder";
import { TeamDto } from "../team";

export class SpaceDto extends BaseEntityDto {
  name: string;
  imgUrl?: string;
  blocks: BlockDto[];
  documents: DocumentDto[];
  folders: FolderDto[];
  rootFolderOrder: string[];
  team: TeamDto;
  teamId: string;

  constructor(
    id: string,
    name: string,
    imgUrl: string | undefined,
    blocks: BlockDto[],
    documents: DocumentDto[],
    folders: FolderDto[],
    rootFolderOrder: string[],
    team: TeamDto,
    teamId: string
  ) {
    super(id);
    this.name = name;
    this.imgUrl = imgUrl;
    this.blocks = blocks;
    this.documents = documents;
    this.folders = folders;
    this.rootFolderOrder = rootFolderOrder;
    this.team = team;
    this.teamId = teamId;
  }
}

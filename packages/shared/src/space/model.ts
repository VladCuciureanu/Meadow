import { Block } from "../block/model";
import { Folder } from "../folder/model";
import { Team } from "../team/model";

export type Space = {
  id: string;
  name: string;
  imgUrl?: string;
  blocks: Block[];
  documents: Document[];
  folders: Folder[];
  rootFolderOrder: string[];
  team: Team;
  teamId: string;
};

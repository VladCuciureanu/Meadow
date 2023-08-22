import { Block } from "../block/model";
import { Folder } from "../folder/model";
import { Space } from "../space/model";
import { User } from "../user/model";

export type Document = {
  id: string;
  title: string;
  previewUrl: string;
  isEmpty: boolean;
  author: User;
  authorId: string;
  space: Space;
  spaceId: string;
  folder?: Folder;
  folderId?: string;
  rootBlock: Block;
  rootBlockId: string;
  created: Date;
  updated: Date;
};

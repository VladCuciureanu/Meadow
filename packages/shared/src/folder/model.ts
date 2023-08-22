import { Space } from "../space/model";

export type Folder = {
  id: string;
  name: string;
  description?: string;
  icon: FolderIconConfig;
  itemOrder: string[];
  documents: Document[];
  parentFolder?: Folder;
  parentFolderId?: string;
  childrenFolders: Folder[];
  space: Space;
  spaceId: string;
  created: Date;
  updated: Date;
};

export interface FolderIconConfig {
  tintColor?: string;
  type: FolderIconType;
  value: string;
}

export enum FolderIconType {
  Emoji = "emoji",
  LocalImage = "localImage",
}

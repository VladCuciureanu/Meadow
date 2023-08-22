import { FolderIconType } from "./model";
import {
  CreateFolderRequest,
  DeleteFolderRequest,
  PatchFolderRequest,
  UpdateFolderRequest,
} from "./request";

export class CreateFolderDto {
  name: string;
  description?: string;
  icon: { tintColor?: string; type: FolderIconType; value: string };
  parentFolderId?: string;
  spaceId: string;

  constructor(request: CreateFolderRequest) {
    this.name = request.body.name;
    this.description = request.body.description;
    this.icon = {
      tintColor: request.body.icon.tintColor,
      type: request.body.icon.type,
      value: request.body.icon.value,
    };
    this.parentFolderId = request.body.parentFolderId;
    this.spaceId = request.body.spaceId;
  }
}

export class UpdateFolderDto {
  id: string;
  name: string;
  description?: string;
  icon: { tintColor?: string; type: FolderIconType; value: string };
  itemOrder: string[];
  parentFolderId?: string;
  spaceId: string;

  constructor(request: UpdateFolderRequest) {
    this.id = request.params.folderId;
    this.name = request.body.name;
    this.description = request.body.description;
    this.icon = {
      tintColor: request.body.icon.tintColor,
      type: request.body.icon.type,
      value: request.body.icon.value,
    };
    this.itemOrder = request.body.itemOrder;
    this.parentFolderId = request.body.parentFolderId;
    this.spaceId = request.body.spaceId;
  }
}

export class PatchFolderDto {
  id: string;
  name?: string;
  description?: string;
  icon?: { tintColor?: string; type?: FolderIconType; value?: string };
  itemOrder?: string[];
  parentFolderId?: string;
  spaceId?: string;

  constructor(request: PatchFolderRequest) {
    this.id = request.params.folderId;
    this.name = request.body.name;
    this.description = request.body.description;
    this.icon = {
      tintColor: request.body.icon?.tintColor,
      type: request.body.icon?.type,
      value: request.body.icon?.value,
    };
    this.itemOrder = request.body.itemOrder;
    this.parentFolderId = request.body.parentFolderId;
    this.spaceId = request.body.spaceId;
  }
}

export class DeleteFolderDto {
  id: string;

  constructor(request: DeleteFolderRequest) {
    this.id = request.params.folderId;
  }
}

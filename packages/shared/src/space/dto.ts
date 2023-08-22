import {
  CreateSpaceRequest,
  DeleteSpaceRequest,
  PatchSpaceRequest,
  UpdateSpaceRequest,
} from "./request";

export class CreateSpaceDto {
  name: string;
  imgUrl?: string;
  teamId: string;
  constructor(request: CreateSpaceRequest) {
    this.name = request.body.name;
    this.imgUrl = request.body.imgUrl;
    this.teamId = request.body.teamId;
  }
}

export class PatchSpaceDto {
  id: string;
  name?: string;
  imgUrl?: string;
  teamId?: string;
  constructor(request: PatchSpaceRequest) {
    this.id = request.params.spaceId;
    this.name = request.body.name;
    this.imgUrl = request.body.imgUrl;
    this.teamId = request.body.teamId;
  }
}

export class UpdateSpaceDto {
  id: string;
  name: string;
  imgUrl?: string;
  teamId: string;
  constructor(request: UpdateSpaceRequest) {
    this.id = request.params.spaceId;
    this.name = request.body.name;
    this.imgUrl = request.body.imgUrl;
    this.teamId = request.body.teamId;
  }
}

export class DeleteSpaceDto {
  id: string;
  constructor(request: DeleteSpaceRequest) {
    this.id = request.params.spaceId;
  }
}

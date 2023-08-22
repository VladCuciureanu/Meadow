import { User } from "../user";
import {
  CreateTeamRequest,
  DeleteTeamRequest,
  PatchTeamRequest,
  UpdateTeamRequest,
} from "./request";

export class CreateTeamDto {
  name: string;
  imgUrl?: string;
  creatorId: string;

  constructor(request: CreateTeamRequest, user: User) {
    this.name = request.body.name;
    this.imgUrl = request.body.imgUrl;
    this.creatorId = user.id;
  }
}

export class PatchTeamDto {
  id: string;
  name?: string;
  imgUrl?: string;

  constructor(request: PatchTeamRequest) {
    this.id = request.params.teamId;
    this.name = request.body.name;
    this.imgUrl = request.body.imgUrl;
  }
}

export class UpdateTeamDto {
  id: string;
  name: string;
  imgUrl?: string;

  constructor(request: UpdateTeamRequest) {
    this.id = request.params.teamId;
    this.name = request.body.name;
    this.imgUrl = request.body.imgUrl;
  }
}

export class DeleteTeamDto {
  id: string;

  constructor(request: DeleteTeamRequest) {
    this.id = request.params.teamId;
  }
}

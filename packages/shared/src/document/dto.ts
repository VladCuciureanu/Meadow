import { User } from "../user";
import {
  CreateDocumentRequest,
  DeleteDocumentRequest,
  PatchDocumentRequest,
  UpdateDocumentRequest,
} from "./request";

export class CreateDocumentDto {
  title: string;
  folderId?: string;
  spaceId: string;
  authorId: string;
  constructor(request: CreateDocumentRequest, user: User) {
    this.title = request.body.title;
    this.folderId = request.body.folderId;
    this.spaceId = request.body.spaceId;
    this.authorId = user.id;
  }
}

export class PatchDocumentDto {
  id: string;
  title?: string;
  folderId?: string;
  spaceId?: string;
  rootBlockId?: string;

  constructor(request: PatchDocumentRequest) {
    this.id = request.params.documentId;
    this.title = request.body.title;
    this.folderId = request.body.folderId;
    this.spaceId = request.body.spaceId;
    this.rootBlockId = request.body.rootBlockId;
  }
}

export class UpdateDocumentDto {
  id: string;
  title: string;
  folderId?: string;
  spaceId: string;
  rootBlockId: string;

  constructor(request: UpdateDocumentRequest) {
    this.id = request.params.documentId;
    this.title = request.body.title;
    this.folderId = request.body.folderId;
    this.spaceId = request.body.spaceId;
    this.rootBlockId = request.body.rootBlockId;
  }
}

export class DeleteDocumentDto {
  id: string;
  constructor(request: DeleteDocumentRequest) {
    this.id = request.params.documentId;
  }
}

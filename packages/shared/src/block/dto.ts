import { BlockColor, BlockType, ListStyle } from "./model";
import {
  CreateBlockRequest,
  DeleteBlockRequest,
  PatchBlockRequest,
  UpdateBlockRequest,
} from "./request";

export class CreateBlockDto {
  type: BlockType;
  listStyle?: ListStyle;
  indentationLevel?: number;
  hasFocusDecoration?: boolean;
  hasBlockDecoration?: boolean;
  spaceId: string;
  documentId: string;
  color?: BlockColor;

  constructor(request: CreateBlockRequest) {
    this.type = request.body.type;
    this.spaceId = request.body.spaceId;
    this.listStyle = request.body.listStyle;
    this.indentationLevel = request.body.indentationLevel;
    this.hasFocusDecoration = request.body.hasFocusDecoration;
    this.hasBlockDecoration = request.body.hasBlockDecoration;
    this.documentId = request.body.documentId;
    this.color = request.body.color;
  }
}

export class PatchBlockDto {
  type?: BlockType;
  listStyle?: ListStyle;
  indentationLevel?: number;
  hasFocusDecoration?: boolean;
  hasBlockDecoration?: boolean;
  spaceId?: string;
  documentId?: string;
  color?: BlockColor;
  id: string;

  constructor(request: PatchBlockRequest) {
    this.id = request.params.blockId;
    this.type = request.body.type;
    this.spaceId = request.body.spaceId;
    this.listStyle = request.body.listStyle;
    this.indentationLevel = request.body.indentationLevel;
    this.hasFocusDecoration = request.body.hasFocusDecoration;
    this.hasBlockDecoration = request.body.hasBlockDecoration;
    this.documentId = request.body.documentId;
    this.color = request.body.color;
  }
}

export class UpdateBlockDto {
  type: BlockType;
  listStyle?: ListStyle;
  indentationLevel?: number;
  hasFocusDecoration?: boolean;
  hasBlockDecoration?: boolean;
  spaceId: string;
  documentId: string;
  color?: BlockColor;
  id: string;

  constructor(request: UpdateBlockRequest) {
    this.id = request.params.blockId;
    this.type = request.body.type;
    this.spaceId = request.body.spaceId;
    this.listStyle = request.body.listStyle;
    this.indentationLevel = request.body.indentationLevel;
    this.hasFocusDecoration = request.body.hasFocusDecoration;
    this.hasBlockDecoration = request.body.hasBlockDecoration;
    this.documentId = request.body.documentId;
    this.color = request.body.color;
  }
}

export class DeleteBlockDto {
  id: string;

  constructor(request: DeleteBlockRequest) {
    this.id = request.params.blockId;
  }
}

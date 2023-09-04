import { PartialBlockDto, BlockDto } from "@meadow/shared";
import { BlockEntity } from "./blocks.entity";
import { FoldersMapper } from "../folders/folders.mapper";
import { UsersMapper } from "../users/users.mapper";
import { DocumentsMapper } from "../documents/documents.mapper";

export class BlocksMapper {
  static toDto(entity: BlockEntity): BlockDto {
    return {
      id: entity.id,
      document: DocumentsMapper.toPartialDto(entity.document),
      type: entity.type,
      indentationLevel: entity.indentationLevel,
      listStyle: {
        type: entity.listStyleType,
        ordinal: entity.listStyleOrdinal,
        state: entity.listStyleTodoState,
      },
      hasBlockDecoration: entity.hasBlockDecoration,
      hasFocusDecoration: entity.hasFocusDecoration,
      color: entity.color,
      content: entity.content, // TODO,
      style: {
        textStyle: entity.textStyle,
        fontStyle: entity.fontStyle,
        alignmentStyle: entity.alignmentStyle,
        cardStyle: undefined as any, // TODO
        coverImage: undefined as any, // Todo
      },
      parentBlock: entity.parentBlock
        ? BlocksMapper.toPartialDto(entity.parentBlock)
        : undefined,
      subblocks: entity.subblocks.map((subblock) =>
        BlocksMapper.toPartialDto(subblock)
      ),
      lineStyle: entity.lineStyle,
      code: entity.code,
      language: entity.language,
      url: entity.url,
      previewUrl: undefined as any, // TODO
    } as any; // TODO: REmove as any after completing mapping
  }

  static toPartialDto(entity: BlockEntity): PartialBlockDto {
    return {
      id: entity.id,
      type: entity.type,
      indentationLevel: entity.indentationLevel,
      listStyle: undefined as any, // TODO:
      hasBlockDecoration: entity.hasBlockDecoration,
      hasFocusDecoration: entity.hasFocusDecoration,
      color: entity.color,
      style: undefined as any, //TODO:
    };
  }
}

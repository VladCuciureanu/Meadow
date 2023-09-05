import { PartialBlockDto, BlockDto, TextRunDto } from "@meadow/shared";
import { BlockEntity, TextRunEntity } from "./blocks.entity";
import { UsersMapper } from "../users/users.mapper";
import { DocumentsMapper } from "../documents/documents.mapper";

export class BlocksMapper {
  static toDto(entity: BlockEntity): BlockDto {
    return {
      id: entity.id,
      document: entity.document
        ? DocumentsMapper.toPartialDto(entity.document)
        : undefined,
      type: entity.type,
      indentationLevel: entity.indentationLevel,
      listStyle: {
        type: entity.listStyleType,
        ordinal: entity.listStyleOrdinal,
        state: entity.listStyleState,
      },
      hasBlockDecoration: entity.hasBlockDecoration,
      hasFocusDecoration: entity.hasFocusDecoration,
      color: entity.color,
      content: entity.content.map((textRun) => textRunToDto(textRun)),
      style: {
        textStyle: entity.styleTextStyle,
        fontStyle: entity.styleFontStyle,
        alignmentStyle: entity.styleAlignmentStyle,
        cardStyle: {
          type: entity.styleCardStyleType,
          fontStyle: entity.styleCardStyleFontStyle,
          backgroundColorKey: entity.styleCardStyleBackgroundColorKey,
          backgroundColor: entity.styleCardStyleBackgroundColor,
          backgroundUrl: entity.styleCardStyleBackgroundUrl,
          isLightColor: entity.styleCardStyleIsLightColor,
        },
        coverImage: {
          enabled: entity.styleCoverImageEnabled,
          url: entity.styleCoverImageUrl,
          aspectRatio: entity.styleCoverImageAspectRatio,
          attribution: entity.styleCoverImageAttribution,
          primaryColor: entity.styleCoverPrimaryColor,
          imageWidth: entity.styleCoverImageWidth,
          hasTransparency: entity.styleCoverImageHasTransparency,
        },
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
      previewUrl: entity.previewUrl,
      filename: entity.filename,
      previewImageStyle: {
        sizeStyle: entity.previewImageStyleSizeStyle,
        fillStyle: entity.previewImageStyleFillStyle,
      },
      layoutStyle: entity.layoutStyle,
      originalUrl: entity.originalUrl,
      imageUrl: entity.imageUrl,
      title: entity.title,
      pageDescription: entity.pageDescription,
      createdAt: entity.createdAt,
      createdBy: UsersMapper.toPartialDto(entity.createdBy),
      modifiedAt: entity.modifiedAt,
      modifiedBy: UsersMapper.toPartialDto(entity.modifiedBy),
    };
  }

  static toPartialDto(entity: BlockEntity): PartialBlockDto {
    return {
      id: entity.id,
    };
  }
}

function textRunToDto(entity: TextRunEntity): TextRunDto {
  return {
    id: entity.id,
    block: BlocksMapper.toPartialDto(entity.block),
    text: entity.text,
    isBold: entity.isBold,
    isItalic: entity.isItalic,
    isStrikeThrough: entity.isStrikeThrough,
    isCode: entity.isCode,
    highlightColor: entity.highlightColor,
    link: {
      type: entity.linkType,
      spaceId: entity.linkSpaceId,
      blockId: entity.blockId,
      date: entity.linkDate,
      url: entity.linkUrl,
      formula: entity.linkFormula,
    },
  };
}

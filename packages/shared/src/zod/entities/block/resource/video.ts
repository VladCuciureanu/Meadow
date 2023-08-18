import { z } from "zod";
import { ResourceBlockSchema, ImageStyleSchema, ImageStyle } from ".";
import { BlockType, BlockTypeEnum } from "..";

export type VideoBlock = z.infer<typeof ResourceBlockSchema> & {
  type: BlockType;
  previewImageStyle: ImageStyle;
};

export const VideoBlockSchema = ResourceBlockSchema.extend({
  type: z.literal(BlockTypeEnum.enum.Video),
  previewImageStyle: ImageStyleSchema,
});

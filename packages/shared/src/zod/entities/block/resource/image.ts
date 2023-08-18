import { z } from "zod";
import { ImageStyle, ImageStyleSchema, ResourceBlockSchema } from ".";
import { BlockType, BlockTypeEnum } from "..";

export type ImageBlock = z.infer<typeof ResourceBlockSchema> & {
  type: BlockType;
  previewImageStyle: ImageStyle;
};

export const ImageBlockSchema = ResourceBlockSchema.extend({
  type: z.literal(BlockTypeEnum.enum.Image),
  previewImageStyle: ImageStyleSchema,
});

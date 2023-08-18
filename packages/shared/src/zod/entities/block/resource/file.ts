import { z } from "zod";
import { ResourceBlockSchema, LayoutStyleEnum, LayoutStyle } from ".";
import { BlockType, BlockTypeEnum } from "..";

export type FileBlock = z.infer<typeof ResourceBlockSchema> & {
  type: BlockType;
  layoutStyle: LayoutStyle;
};

export const FileBlockSchema = ResourceBlockSchema.extend({
  type: z.literal(BlockTypeEnum.enum.File),
  layoutStyle: LayoutStyleEnum,
});

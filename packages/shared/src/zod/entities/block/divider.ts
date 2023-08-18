import { z } from "zod";
import { BaseBlockSchema } from "./base";
import { BlockType, BlockTypeEnum } from ".";

export const LineStyleEnum = z.enum([
  "Strong",
  "Regular",
  "Light",
  "ExtraLight",
]);
export type LineStyle = z.infer<typeof LineStyleEnum>;

export type DividerBlock = z.infer<typeof BaseBlockSchema> & {
  type: BlockType;
  lineStyle: LineStyle;
};

export const DividerBlockSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeEnum.enum.Divider),
  lineStyle: LineStyleEnum,
});

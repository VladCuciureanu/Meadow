import { z } from "zod";
import { BlockTypeEnum } from ".";

export const BlockColorEnum = z.enum([
  "Text",
  "Text1",
  "Text2",
  "Text3",
  "Text4",
  "Grey",
  "Grey1",
  "Grey2",
  "Grey3",
  "Grey4",
  "Pink",
  "Pink1",
  "Pink2",
  "Pink3",
  "Pink4",
  "Purple",
  "Purple1",
  "Purple2",
  "Purple3",
  "Purple4",
  "Blue",
  "Blue1",
  "Blue2",
  "Blue3",
  "Blue4",
  "Cyan",
  "Cyan1",
  "Cyan2",
  "Cyan3",
  "Cyan4",
  "Green",
  "Green1",
  "Green2",
  "Green3",
  "Green4",
  "Olive",
  "Olive1",
  "Olive2",
  "Olive3",
  "Olive4",
  "Red",
  "Red1",
  "Red2",
  "Red3",
  "Red4",
  "Yellow",
  "Yellow1",
  "Yellow2",
  "Yellow3",
  "Yellow4",
]);
export type BlockColor = z.infer<typeof BlockColorEnum>;

export const ListStyleTypeEnum = z.enum([
  "None",
  "Bullet",
  "Numbered",
  "Todo",
  "Toggle",
]);
export type ListStyleType = z.infer<typeof ListStyleTypeEnum>;

export const NoneListStyleSchema = z.object({
  type: z.literal(ListStyleTypeEnum.enum.None),
});
export type NoneListStyle = z.infer<typeof NoneListStyleSchema>;

export const BulletListStyleSchema = z.object({
  type: z.literal(ListStyleTypeEnum.enum.Bullet),
});
export type BulletListStyle = z.infer<typeof BulletListStyleSchema>;

export const NumberedListStyleSchema = z.object({
  type: z.literal(ListStyleTypeEnum.enum.Numbered),
  ordinal: z.number().optional(),
});
export type NumberedListStyle = z.infer<typeof NumberedListStyleSchema>;

export const TodoStateEnum = z.enum(["Unchecked", "Checked", "Canceled"]);
export type TodoState = z.infer<typeof TodoStateEnum>;

export const TodoListStyleSchema = z.object({
  type: z.literal(ListStyleTypeEnum.enum.Todo),
  state: TodoStateEnum,
});
export type TodoListStyle = z.infer<typeof TodoListStyleSchema>;

export const ToggleListStyleSchema = z.object({
  type: z.literal(ListStyleTypeEnum.enum.Numbered),
  ordinal: z.number().optional(),
});
export type ToggleListStyle = z.infer<typeof ToggleListStyleSchema>;

export const ListStyleSchema = z.discriminatedUnion("type", [
  NoneListStyleSchema,
  BulletListStyleSchema,
  NumberedListStyleSchema,
  TodoListStyleSchema,
  ToggleListStyleSchema,
]);
export type ListStyle = z.infer<typeof ListStyleSchema>;

export const BaseBlockSchema = z.object({
  id: z.string().uuid(),
  spaceId: z.string().uuid().optional(),
  documentId: z.string().uuid().optional(),
  indentationLevel: z.number(),
  listStyle: ListStyleSchema,
  hasBlockDecoration: z.boolean(),
  hasFocusDecoration: z.boolean(),
  color: BlockColorEnum,
  type: BlockTypeEnum,
});
export type BaseBlock = z.infer<typeof BaseBlockSchema>;

import { z } from "zod";
import { BaseBlockSchema } from "../base";

export const ResourceBlockSchema = BaseBlockSchema.extend({
  url: z.string().optional(),
  previewUrl: z.string().url().optional(),
  filename: z.string().optional(),
});

export const ImageSizeStyleEnum = z.enum(["Auto", "Large"]);
export type ImageSizeStyle = z.infer<typeof ImageSizeStyleEnum>;

export const ImageFillStyleEnum = z.enum(["Auto", "Fit", "Fill"]);
export type ImageFillStyle = z.infer<typeof ImageSizeStyleEnum>;

export const ImageStyleSchema = z.object({
  sizeStyle: ImageSizeStyleEnum,
  fillStyle: ImageFillStyleEnum,
});
export type ImageStyle = z.infer<typeof ImageStyleSchema>;

export const LayoutStyleEnum = z.enum(["Regular", "Small", "Card"]);
export type LayoutStyle = z.infer<typeof LayoutStyleEnum>;

export * from "./image";
export * from "./video";
export * from "./file";

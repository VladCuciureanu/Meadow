import { z } from "zod";
import { BlockType, BlockTypeEnum } from ".";
import { BaseBlockSchema } from "./base";

export const CodeLanguageEnum = z.enum([
  "Bash",
  "Ada",
  "CPP",
  "CSharp",
  "CSS",
  "Dart",
  "Go",
  "Groovy",
  "Haskell",
  "Html",
  "Java",
  "JavaScript",
  "JSON",
  "Julia",
  "Kotlin",
  "Lua",
  "Markdown",
  "MathFormula",
  "Matlab",
  "ObjectiveC",
  "Perl",
  "PHP",
  "Prolog",
  "Python",
  "R",
  "Ruby",
  "Rust",
  "Scala",
  "Shell",
  "SQL",
  "Swift",
  "TypeScript",
  "VBNet",
  "XML",
  "YAML",
  "Other",
]);
export type CodeLanguage = z.infer<typeof CodeLanguageEnum>;

export type CodeBlock = z.infer<typeof BaseBlockSchema> & {
  type: BlockType;
  code: string;
  language: CodeLanguage;
};

export const CodeBlockSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeEnum.enum.Code),
  code: z.string(),
  language: CodeLanguageEnum,
});

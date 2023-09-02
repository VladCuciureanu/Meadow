import { z } from "zod";

const BodySchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const GetTokenRequestSchema = z.object({
  body: BodySchema,
});

export type GetTokenRequest = z.infer<typeof BodySchema>;

export type GetTokenResponse = string;

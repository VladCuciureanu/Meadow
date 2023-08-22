import { z } from "zod";

export const LogInSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .strict(),
});

export type LogInRequest = z.infer<typeof LogInSchema>;

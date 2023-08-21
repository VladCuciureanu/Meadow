import { z } from "zod";
import { UserSchema } from "../entities";

const HasUserId = z.object({
  params: z.object({
    userId: z
      .string({ required_error: "User ID is required." })
      .uuid("Invalid user ID."),
  }),
});

export const UserCredentialsSchema = z.object({
  body: UserSchema.omit({
    id: true,
    firstName: true,
    lastName: true,
    passwordHash: true,
    imgUrl: true,
    teams: true,
  })
    .extend({ password: z.string() })
    .strict(),
});

const MutableFields = UserSchema.omit({
  id: true,
  passwordHash: true,
  teams: true,
});

export const CreateUserSchema = z.object({
  body: MutableFields.extend({
    password: z.string(),
  }).strict(),
});

export const UpdateUserSchema = HasUserId.merge(
  z.object({
    body: MutableFields.extend({
      password: z.string(),
    }).strict(),
  })
);

export const PatchUserSchema = HasUserId.merge(
  z.object({
    body: MutableFields.extend({
      password: z.string(),
    })
      .partial()
      .strict(),
  })
);

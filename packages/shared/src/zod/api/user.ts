import { z } from "zod";

const HasUserId = z.object({
  params: z.object({
    userId: z
      .string({ required_error: "User ID is required." })
      .uuid("Invalid user ID."),
  }),
});

const UserFields = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email is required." })
        .email("Invalid email."),
      password: z
        .string({ required_error: "Password is required." })
        .min(8)
        .max(32),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      imgUrl: z.string().url("Invalid image URL.").optional(),
    })
    .strict(),
});

export const CreateUserSchema = UserFields;

export const PatchUserSchema = HasUserId.merge(
  z.object({
    body: UserFields.shape.body.partial().nonstrict(),
  })
);

export const UpdateUserSchema = HasUserId.merge(UserFields);

export const LogInUserSchema = z.object({
  body: UserFields.shape.body
    .omit({
      firstName: true,
      lastName: true,
      imgUrl: true,
    })
    .strict(),
});

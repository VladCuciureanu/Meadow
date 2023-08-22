import { z } from "zod";

const HasUserId = z.object({
  params: z.object({
    userId: z
      .string({ required_error: "User ID is required." })
      .uuid("Invalid user ID."),
  }),
});

const MutableFields = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  imgUrl: z.string().url().optional(),
});

export const CreateUserSchema = z.object({
  body: MutableFields.strict(),
});

export const UpdateUserSchema = HasUserId.merge(
  z.object({
    body: MutableFields.strict(),
  })
);

export const PatchUserSchema = HasUserId.merge(
  z.object({
    body: MutableFields.deepPartial().strict(),
  })
);

export const DeleteUserSchema = HasUserId;

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
export type PatchUserRequest = z.infer<typeof PatchUserSchema>;
export type DeleteUserRequest = z.infer<typeof DeleteUserSchema>;

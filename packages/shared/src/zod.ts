import { object, string } from "zod";

const HasUserId = object({
  params: object({
    userId: string({ required_error: "User ID is required." }).uuid(
      "Invalid user ID."
    ),
  }),
});

const UserFields = object({
  body: object({
    email: string({ required_error: "Email is required." }).email(
      "Invalid email."
    ),
    password: string({ required_error: "Password is required." })
      .min(8)
      .max(32),
    firstName: string().optional(),
    lastName: string().optional(),
    imgUrl: string().url("Invalid image URL.").optional(),
  }).strict(),
});

export const CreateUserSchema = UserFields;

export const PatchUserSchema = HasUserId.merge(
  object({
    body: UserFields.shape.body.partial().nonstrict(),
  })
);

export const UpdateUserSchema = HasUserId.merge(UserFields);

export const LogInUserSchema = object({
  body: UserFields.shape.body
    .omit({
      firstName: true,
      lastName: true,
      imgUrl: true,
    })
    .strict(),
});

import { z } from "zod";
import { PartialTeamDto } from "../teams";

export type UserDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imgUrl?: string;
  teams: PartialTeamDto[];
  createdAt: Date;
};

export type PartialUserDto = Pick<
  UserDto,
  "id" | "firstName" | "lastName" | "imgUrl"
>;

export const HasUserIdSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
});

export * from "./commands";
export * from "./commands/create-user";
export * from "./commands/update-user";
export * from "./commands/delete-user";
export * from "./queries/get-user";
export * from "./queries/get-users";

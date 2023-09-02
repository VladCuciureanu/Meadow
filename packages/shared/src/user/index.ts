import { PartialTeamDto } from "../team";

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

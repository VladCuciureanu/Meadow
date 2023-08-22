import { BaseEntityDto } from "../common";
import { TeamDto } from "../team";

export class UserDto extends BaseEntityDto {
  email: string;
  firstName: string;
  lastName: string;
  imgUrl?: string;
  teams: TeamDto[];

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    imgUrl: string | undefined,
    teams: TeamDto[]
  ) {
    super(id);
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imgUrl = imgUrl;
    this.teams = teams;
  }
}

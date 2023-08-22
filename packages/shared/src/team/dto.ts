import { BaseEntityDto } from "../common";
import { SpaceDto } from "../space";
import { UserDto } from "../user";

export class TeamDto extends BaseEntityDto {
  name: string;
  imgUrl?: string;
  members: UserDto[];
  spaces: SpaceDto[];

  constructor(
    id: string,
    name: string,
    imgUrl: string | undefined,
    members: UserDto[],
    spaces: SpaceDto[]
  ) {
    super(id);
    this.name = name;
    this.imgUrl = imgUrl;
    this.members = members;
    this.spaces = spaces;
  }
}

import { UserDto } from "../user";

export interface BaseEntityDto {
  id: string;
}

export interface BaseAuditableEntityDto extends BaseEntityDto {
  created: Date;
  createdBy: UserDto;
  modified: Date;
  modifiedBy: UserDto;
}

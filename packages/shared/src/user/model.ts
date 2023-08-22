import { Team } from "../team/model";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  imgUrl?: string;
  teams: Team[];
}

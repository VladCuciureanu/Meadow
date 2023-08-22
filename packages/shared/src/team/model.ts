import { Space } from "../space/model";
import { User } from "../user/model";

export interface Team {
  id: string;
  name: string;
  imgUrl?: string;
  members: User[];
  spaces: Space[];
}

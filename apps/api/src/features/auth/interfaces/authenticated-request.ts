import { User } from "@meadow/shared";

export type AuthenticatedRequest = Request & {
  user: User;
};

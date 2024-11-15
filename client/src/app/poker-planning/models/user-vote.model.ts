import { User } from "../../auth/models/user.model";

export interface UserVote {
  user: User;
  vote: number;
}
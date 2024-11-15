import { User } from "../../auth/models/user.model";
import { UserStory } from "./user-story.model";

export interface UserStoryVote {
  _id?: string;
  user: User;
  userStory: UserStory;
  vote: number;
}
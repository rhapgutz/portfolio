import { UserStory } from "./user-story.model";
import { UserMessage } from "./user-message.model";

export interface Planning {
  userStories: UserStory[];
  userMessages: UserMessage[];
  selectedUserStoryId?: string;
}
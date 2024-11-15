import {createFeatureSelector, createSelector} from '@ngrx/store';
import { currentUserStoryFeatureKey, UserStoryState } from './reducers/current-user-story';

export const selectCurrentUserStoryState = createFeatureSelector<UserStoryState>(currentUserStoryFeatureKey);

export const selectedUserStory = createSelector(
  selectCurrentUserStoryState,
  (state: UserStoryState) => state.userStory
);

export const currentUserVotes = createSelector(
  selectCurrentUserStoryState,
  (state: UserStoryState) => state.userVotes
);

export const isSHowUserVotes = createSelector(
  selectCurrentUserStoryState,
  (state: UserStoryState) => state.showUserVotes
)
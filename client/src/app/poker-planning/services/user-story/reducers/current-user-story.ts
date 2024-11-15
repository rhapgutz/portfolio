import {
  createReducer,
  on
} from '@ngrx/store';
import {UserStory} from '../../../models/user-story.model';
import {UserStoryActions} from '../action-types';
import { UserVote } from '../../../models/user-vote.model';

export const currentUserStoryFeatureKey = 'currentUserStory';

export interface UserStoryState {
  userStory: UserStory;
  userVotes: UserVote[];
  showUserVotes: boolean;
}

export const initialState: UserStoryState = {
  userStory: undefined,
  userVotes: [],
  showUserVotes: false
};

export const currentUserStoryReducer = createReducer(
  initialState,
  on(UserStoryActions.selectUserStory, (state, { userStory }) => {
    const userVotes = [];
    const showUserVotes = false;
    return { ...state, userStory, userVotes, showUserVotes }
  }),
  on(UserStoryActions.selectUserStoryFromWebSocket, (state, { userStory }) => {
    const userVotes = [];
    const showUserVotes = false;
    return { ...state, userStory, userVotes, showUserVotes }
  }),
  on(UserStoryActions.selectUserStoryPoint, (state, { userVotes }) => {
    return { ...state, userVotes }
  }),
  on(UserStoryActions.selectUserStoryPointFromWebSocket, (state, { userVotes }) => {
    return { ...state, userVotes }
  }),
  on(UserStoryActions.revealCards, (state, { showUserVotes }) => {
    return { ...state, showUserVotes }
  }),
  on(UserStoryActions.revealCardsFromWebSocket, (state, { showUserVotes }) => {
    return { ...state, showUserVotes }
  })
);

export const selectUserStoryState = (state: UserStoryState) => state;
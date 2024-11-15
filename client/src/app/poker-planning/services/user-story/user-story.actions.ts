import {createAction, props} from '@ngrx/store';
import {UserStory} from '../../models/user-story.model';
import { UserVote } from '../../models/user-vote.model';

export const selectUserStory = createAction(
    "[Poker Planning] Select User Story",
    props<{ userStory: UserStory }>()
);

export const selectUserStoryFromWebSocket = createAction(
    "[Poker Planning] Select User Story from Web Socket",
    props<{ userStory: UserStory }>()
);

export const selectUserStoryPoint = createAction(
    "[Poker Planning] Select User Story Vote",
    props<{ userVotes: UserVote[]}>()
)

export const selectUserStoryPointFromWebSocket = createAction(
    "[Poker Planning] Select User Story Vote from Web Socket",
    props<{ userVotes: UserVote[]}>()
)

export const revealCards = createAction(
    "[Poker Planning] Reveal Cards",
    props<{ showUserVotes: boolean }>()
)

export const revealCardsFromWebSocket = createAction(
    "[Poker Planning] Reveal Cards from Web Socket",
    props<{ showUserVotes: boolean }>()
)
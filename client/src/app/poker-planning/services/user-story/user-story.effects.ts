import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserStoryActions} from './action-types';
import {exhaustMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { UserStory } from '../../models/user-story.model';
import { UserStorySocketService } from './user-story-socket.service';
import { select } from '@ngrx/store';
import { selectedUserStory } from './user-story.selectors';
import { UserStoryWsState } from '../../models/user-story-ws-state';

@Injectable()
export class UserStoryEffects {
  selectUserStory$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(UserStoryActions.selectUserStory),
        tap(action => {
          const state = <UserStoryWsState> {
            action: 'selectUserStory',
            value: action.userStory
          };
          this.socketService.sendUserStoryState(state);
        })
      )
  ,
  {dispatch: false});

  selectUserStoryPoint$ = createEffect(() => 
    this.actions$
      .pipe(
        ofType(UserStoryActions.selectUserStoryPoint),
        tap(action => {
          const state = <UserStoryWsState> {
            action: 'selectUserStoryPoint',
            value: action.userVotes
          };
          this.socketService.sendUserStoryState(state);
        })
      )
  ,
  {dispatch: false});

  showUserVotes$ = createEffect(() => 
    this.actions$
      .pipe(
        ofType(UserStoryActions.revealCards),
        tap(action => {
          const state = <UserStoryWsState> {
            action: 'revealCards',
            value: action.showUserVotes
          };
          this.socketService.sendUserStoryState(state);
        })
      )
  ,
  {dispatch: false});

  constructor(
    private actions$: Actions,
    private router: Router,
    private socketService: UserStorySocketService
  ) {}
}

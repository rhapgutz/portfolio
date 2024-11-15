import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Planning } from '../../models/planning';
import { UserStoryEntityService } from '../../services/user-story/user-story-entity.service'
import { map } from 'rxjs/operators';
import { UserStory } from '../../models/user-story.model';
import { Store } from '@ngrx/store';
import { revealCardsFromWebSocket, selectUserStory, selectUserStoryFromWebSocket, selectUserStoryPointFromWebSocket } from '../../services/user-story/user-story.actions';
import { UserStorySocketService } from '../../services/user-story/user-story-socket.service';
import { UserStoryWsState } from '../../models/user-story-ws-state';
import { UserMessageEntityService } from '../../services/user-message/user-message-entity.service';

@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent implements OnInit, OnDestroy {
  
  planningData$: Observable<Planning>;

  getUserStoryWsStateSubscription: Subscription;

  constructor(
    private readonly userStoryEntityService: UserStoryEntityService,
    private readonly userMessageEntityService: UserMessageEntityService,
    private readonly store: Store,
    private readonly socketService: UserStorySocketService
  ) { }

  ngOnInit(): void {
    this.planningData$ = combineLatest([
      this.userStoryEntityService.entities$,
      this.userMessageEntityService.entities$
    ]).pipe(
      map(([userStories, userMessages]) => {
        return { userStories, userMessages }
      })
    );

    this.getUserStoryWsStateSubscription = this.socketService.getUserStoryState().subscribe(
      (state: UserStoryWsState) => {
        switch (state.action) {
          case 'selectUserStory':
            this.store.dispatch(selectUserStoryFromWebSocket({userStory: state.value}));
            break;
          case 'selectUserStoryPoint':
            this.store.dispatch(selectUserStoryPointFromWebSocket({ userVotes: state.value }))
            break;
          case 'revealCards':
            this.store.dispatch(revealCardsFromWebSocket({ showUserVotes: state.value }))
            break
          default:
            break;
        }
      }
    )
  }

  updateSelectedUserStoryId(userStory: UserStory): void {
    this.store.dispatch(selectUserStory({userStory}));
  }

  ngOnDestroy(): void {
    this.getUserStoryWsStateSubscription.unsubscribe();
  }
}

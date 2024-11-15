import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserStory } from '../../models/user-story.model';
import { UserStoryVote } from '../../models/user-story-vote.model';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { PokerCard } from '../../models/poker-card';
import { User } from '../../../auth/models/user.model';
import { select, Store } from '@ngrx/store';
import { UserVote } from '../../models/user-vote.model';
import { revealCards, revealCardsFromWebSocket, selectUserStoryPoint, selectUserStoryPointFromWebSocket } from '../../services/user-story/user-story.actions';
import { currentUserVotes, isSHowUserVotes, selectedUserStory } from '../../services/user-story/user-story.selectors';
import { UserStorySocketService } from '../../services/user-story/user-story-socket.service';

@Component({
  selector: 'user-story',
  templateUrl: './user-story.component.html',
  styleUrl: './user-story.component.scss'
})
export class UserStoryComponent implements OnInit, OnDestroy {

  pokerCardsSubject = new BehaviorSubject<PokerCard[]>([]);
  pokerCards$: Observable<PokerCard[]> = this.pokerCardsSubject.asObservable();

  userCardsSubject = new BehaviorSubject<PokerCard[]>([]);
  userCards$: Observable<PokerCard[]> = this.userCardsSubject.asObservable();

  selectedCardValueSubject = new BehaviorSubject<Number>(null);
  selectedCardValue$: Observable<Number> = this.selectedCardValueSubject.asObservable();

  userProfile$: Observable<User>;
  userStoryVote: UserStoryVote;

  currentUserStory$: Observable<UserStory>;
  currentUserVotes$: Observable<UserVote[]>;
  currentUserVotes: UserVote[];
  currentSelectedCard: Number;

  selectUserStoryPointSubscription: Subscription;
  showUserVotesSubscription: Subscription;
  showUserVotes$: Observable<boolean>;

  constructor(
    private store: Store,
    private socketService: UserStorySocketService
  ) {
  }

  ngOnInit(): void {
    this.currentUserStory$ = this.store.pipe(
      select(selectedUserStory)
    );
    this.currentUserStory$.subscribe();

    this.currentUserVotes$ = this.store.pipe(
      select(currentUserVotes)
    );
    this.currentUserVotes$.subscribe(
      (currentUserVotes) => {
        this.currentUserVotes = currentUserVotes;
        this._generateUserCards(currentUserVotes);
      }
    );

    this.showUserVotes$ = this.store.pipe(
      select(isSHowUserVotes)
    );
    this.showUserVotes$.subscribe();
    
    this.selectedCardValue$.subscribe(
      (value) => this._generatePokerCards(value)
    );
  }

  updateSelectedPokerCard(selectedCard: PokerCard): void {
    const userProfile = this._getUserProfile();
    const userVote = <UserVote> {
      user: userProfile,
      vote: selectedCard.value
    }

    const currentUserVotes = [ ...this.currentUserVotes ];
    const currentUserVoteIndex = currentUserVotes.findIndex((userVote: UserVote) => userVote.user._id === userProfile._id);

    if (currentUserVoteIndex > -1) {
      currentUserVotes.splice(currentUserVoteIndex, 1);
    }

    const userVotes = [ ...currentUserVotes, userVote ];

    this.store.dispatch(
      selectUserStoryPoint({userVotes})
    );
  }

  onRevealCards(): void {
    const showUserVotes = true;
    this.store.dispatch(revealCards({showUserVotes}));
  }

  private _generatePokerCards(selectedCardValue: Number): void {
    const cards =  [0, 1, 2, 3, 5, 8, 13, 21];
    const pokerCards: PokerCard[] = [];
    cards.forEach((value) => {
      const selected = value === selectedCardValue
      pokerCards.push(<PokerCard> { value, selected })
    });
    this.pokerCardsSubject.next(pokerCards);
  }

  private _generateUserCards(userVotes: UserVote[]): void {
    const userProfile = this._getUserProfile();
    const currentUserVote = userVotes?.find((userVote) => userVote.user._id === userProfile._id);

    if (currentUserVote) {
      this.selectedCardValueSubject.next(currentUserVote.vote);
    } else {
      this.selectedCardValueSubject.next(null);
    }

    const userCards: PokerCard[] = [];
    if (userVotes.length) {
      userVotes.forEach((userVote: UserVote) => {
        userCards.push({
          value: userVote.vote,
          selected: false,
          user: userVote.user
        });
      });
    }
    this.userCardsSubject.next(userCards);
  }

  private _getUserProfile(): User {
    const userProfileJSON = localStorage.getItem('user');
    const userProfile = JSON.parse(userProfileJSON);
    return userProfile;
  }

  ngOnDestroy(): void {
    this.selectUserStoryPointSubscription.unsubscribe();
  }
}

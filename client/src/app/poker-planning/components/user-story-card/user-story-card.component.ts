import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserStory } from '../../models/user-story.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserStoryEntityService } from '../../services/user-story/user-story-entity.service';
import { UserStoriesDataService } from '../../services/user-story/user-stories-data.service';
import { selectedUserStory } from '../../services/user-story/user-story.selectors';

@Component({
  selector: 'user-story-card',
  templateUrl: './user-story-card.component.html',
  styleUrl: './user-story-card.component.scss'
})
export class UserStoryCardComponent implements OnInit {
  @Input()
  userStory: UserStory;

  @Output()
  selectedUserStoryEvent = new EventEmitter<UserStory>(null);


  selected: boolean;

  constructor(private store: Store, private userStoriesService: UserStoriesDataService) {

  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectedUserStory),
      tap(userStory => this.selected = userStory?._id === this.userStory._id)
    ).subscribe();
  }

  onSelectUserStory(userStory: UserStory): void {
    this.selectedUserStoryEvent.emit(userStory);
  }
}

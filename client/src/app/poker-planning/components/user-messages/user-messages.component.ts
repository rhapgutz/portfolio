import { Component, OnInit } from '@angular/core';
import { UserMessageEntityService } from '../../services/user-message/user-message-entity.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserMessage } from '../../models/user-message.model';
import { User } from '../../../auth/models/user.model';
import { select, Store } from '@ngrx/store';
import { selectUserInfo } from '../../../auth/auth.selectors';

@Component({
  selector: 'user-messages',
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.scss'
})

export class UserMessagesComponent implements OnInit {

  data$: Observable<MessageData>;
  userMessages$: Observable<UserMessage[]>;

  newMessage: string;
  userInfo: User;

  constructor(
    private store: Store,
    private userMessageEntityService: UserMessageEntityService
  ) {

  }

  ngOnInit(): void {
    this.data$ = combineLatest([
      this.store.pipe(
        select(selectUserInfo)
      ),
      this.userMessageEntityService.entities$
    ]).pipe(
      map(([user, messages]) => {
        this.userInfo = user;
        return { user, messages }
      })
    );
    this.data$.subscribe();
  }

  getUserInitial(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }

  sendMessage(): void {
    if (this.newMessage) {
      const message = this.newMessage;
      this.userMessageEntityService.add({ message });
      this.newMessage = '';
    }
  }
}

export interface MessageData {
  user: User;
  messages: UserMessage[];
}
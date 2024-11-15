import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { UserStory } from "../../models/user-story.model";
import { UserVote } from "../../models/user-vote.model";
import { UserStoryWsState } from "../../models/user-story-ws-state";
//import { CurrentUserStoryState } from "./reducers/current-user-story";

@Injectable()
export class UserStorySocketService {
  constructor(private socket: Socket) {}

  sendUserStoryState(state: UserStoryWsState): void {
    this.socket.emit('sendUserStoryStateToServer', state);
  }

  getUserStoryState() {
    return this.socket.fromEvent<any>('sendUserStoryStateToClients');
  }

  sendSelectedUserStory(userStory: UserStory): void {
    this.socket.emit('changeUserStoryToServer', userStory);
  }

  sendCurrentUserVotes(userVotes: UserVote[]): void {
    this.socket.emit('changeUserStoryVotesToServer', userVotes);
  }

  getSelectedUserStory() {
    return this.socket.fromEvent<any>('changeUserStoryToClients')
  }

  getCurrentUserStoryVotes() {
    return this.socket.fromEvent<any>('changeUserStoryVotesToClients')
  }

  sendShowUserVotes(showUserVotes: boolean) {
    this.socket.emit('changeShowUserVotesToServer', showUserVotes);
  }

  getShowUserVotes() {
    return this.socket.fromEvent<any>('changeShowUserVotesToClients');
  }

  destroy(): void {
    this.socket.removeAllListeners('changeUserStoryToServer');
    this.socket.removeAllListeners('changeUserStoryVotesToServer');
    this.socket.removeAllListeners('changeUserStoryToClients');
    this.socket.removeAllListeners('changeUserStoryVotesToClients');
  }
}
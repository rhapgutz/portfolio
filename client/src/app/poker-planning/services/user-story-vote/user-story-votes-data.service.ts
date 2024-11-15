import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import { UserStoryVote } from "../../models/user-story-vote.model";

@Injectable()
export class UserStoryVotesDataService extends DefaultDataService<UserStoryVote> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("UserStoryVote", http, httpUrlGenerator);
  }
}

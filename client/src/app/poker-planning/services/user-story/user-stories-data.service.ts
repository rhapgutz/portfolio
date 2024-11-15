import { Injectable } from "@angular/core";
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import { UserStory } from "../../models/user-story.model";

@Injectable()
export class UserStoriesDataService extends DefaultDataService<UserStory> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super("UserStory", http, httpUrlGenerator);
  }
}

import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { UserStoryVote } from "../../models/user-story-vote.model";

@Injectable()
export class UserStoryVoteEntityService extends EntityCollectionServiceBase<UserStoryVote> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("UserStoryVote", serviceElementsFactory);
  }
}

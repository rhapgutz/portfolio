import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { UserStory } from "../../models/user-story.model";

@Injectable()
export class UserStoryEntityService extends EntityCollectionServiceBase<UserStory> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("UserStory", serviceElementsFactory);
  }
}

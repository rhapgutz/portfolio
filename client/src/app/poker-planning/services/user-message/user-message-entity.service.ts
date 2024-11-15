import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { UserMessage } from "../../models/user-message.model";

@Injectable()
export class UserMessageEntityService extends EntityCollectionServiceBase<UserMessage> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("UserMessage", serviceElementsFactory);
  }
}

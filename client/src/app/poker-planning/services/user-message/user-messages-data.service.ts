import { Injectable } from "@angular/core";
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import { UserMessage } from "../../models/user-message.model";

@Injectable()
export class UserMessagesDataService extends DefaultDataService<UserMessage> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super("UserMessage", http, httpUrlGenerator);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { Message } from "../../models/message";

@Injectable()
export class MessagesService {
  private subject = new BehaviorSubject<Message>(null);
  data$: Observable<Message> = this.subject
    .asObservable()
    .pipe(filter((data) => data && data.messages?.length > 0));

  /* showErrors(...errors: string[]) {
    this.subject.next(errors);
  } */

  showMessages(type: string, ...messages: string[]) {
    this.subject.next(<Message>{
      type,
      messages,
    });
  }
}

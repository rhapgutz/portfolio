import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { MessagesService } from "./messages.service";
import { Message } from "../../models/message";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
})
export class MessagesComponent implements OnInit {
  showMessages = false;

  data$: Observable<Message>;

  constructor(public messagesService: MessagesService) {
    console.log("Created messages component");
  }

  ngOnInit() {
    this.data$ = this.messagesService.data$.pipe(
      tap(() => (this.showMessages = true))
    );
  }

  onClose() {
    this.showMessages = false;
  }
}

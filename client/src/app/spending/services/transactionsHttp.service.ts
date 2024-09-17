import { HttpClient } from "@angular/common/http";
import { MessagesService } from "../components/messages/messages.service";
import { Transaction } from "../model/transaction";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class TransactionsHttpService {
  constructor(private http: HttpClient, private messages: MessagesService) {}

  findAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>("/api/v1/transactions").pipe(
      map((response) => response["transactions"]),
      catchError((err) => {
        const message = "Could not load transactions";
        this.messages.showMessages("error", message);
        console.log(message, err);
        return throwError(err);
      })
    );
  }
}

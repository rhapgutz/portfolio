import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { Category } from "../model/category";
import { catchError, map, tap } from "rxjs/operators";
import { LoadingService } from "../components/loading/loading.service";
import { Transaction } from "../model/transaction";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { MessagesService } from "../components/messages/messages.service";

@Injectable({
  providedIn: "root",
})
export class TransactionsStore {
  private subject = new BehaviorSubject<Transaction[]>([]);
  transactions$: Observable<Transaction[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService
  ) {
    this.loadTransactions();
  }

  private loadTransactions() {
    const loadTransactions$ = this.http
      .get<Transaction[]>("/api/v1/transactions")
      .pipe(
        map((response) => response["transactions"]),
        catchError((err) => {
          const message = "Could not load transactions";
          this.messages.showMessages("error", message);
          console.log(message, err);
          return throwError(err);
        }),
        tap((transactions) => this.subject.next(transactions))
      );

    this.loading.showLoaderUntilCompleted(loadTransactions$).subscribe();
  }
}

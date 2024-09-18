import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TransactionsActions } from "../action-types";
import { concatMap, map } from "rxjs/operators";
import { allTransactionsLoaded } from "./transaction.actions";
import { TransactionsHttpService } from "../../services/transactions/transactions-http.service";
import { Injectable } from "@angular/core";

@Injectable()
export class TransactionsEffects {
  loadTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsActions.loadAllTransactions),
      concatMap((action) => this.transactionsHttpService.findAllTransactions()),
      map((transactions) => allTransactionsLoaded({ transactions }))
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private transactionsHttpService: TransactionsHttpService
  ) {}
}

import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { areTransactionsLoaded } from "./transactions.selectors";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllTransactions } from "./transaction.actions";

export const TransactionsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let loading = false;
  const store = inject(Store<AppState>);

  return store.pipe(
    select(areTransactionsLoaded),
    tap((transactionsLoaded) => {
      if (!loading && !transactionsLoaded) {
        loading = true;
        store.dispatch(loadAllTransactions());
      }
    }),
    filter((transactionsLoaded) => transactionsLoaded),
    first(),
    finalize(() => (loading = false))
  );
};

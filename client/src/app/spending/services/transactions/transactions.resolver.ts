import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { filter, first, tap } from "rxjs/operators";
import { TransactionEntityService } from "./transaction-entity.service";

export const TransactionsResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const transactionEntityService = inject(TransactionEntityService);
  return transactionEntityService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        transactionEntityService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};

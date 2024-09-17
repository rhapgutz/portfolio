import { createAction, props } from "@ngrx/store";
import { Transaction } from "../../model/transaction";

export const loadAllTransactions = createAction(
  "[Transactions Resolver] Loadd All Transactions"
);

export const allTransactionsLoaded = createAction(
  "[Load Transactions Effect] All Transactions Loaded",
  props<{ transactions: Transaction[] }>()
);

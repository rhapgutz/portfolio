import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Transaction } from "../../model/transaction";
import { createReducer, on } from "@ngrx/store";
import { TransactionsActions } from "../action-types";

export const transactionsFeatureKey = "transactions";

export interface TransactionsState extends EntityState<Transaction> {
  allTransactionsLoaded: boolean;
}

export const adapter = createEntityAdapter<Transaction>();

export const initialCatgoriesState = adapter.getInitialState({
  allTransactionsLoaded: false,
});

export const transactionsReducer = createReducer(
  initialCatgoriesState,
  on(TransactionsActions.allTransactionsLoaded, (state, action) =>
    adapter.setAll(action.transactions, {
      ...state,
      allTransactionsLoaded: true,
    })
  )
);

export const { selectAll } = adapter.getSelectors();

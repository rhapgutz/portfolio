import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromTransactions from "./transactions.reducers";
import { Transaction } from "../../model/transaction";
import { Moment } from "moment";
import { LOCALE_ID, inject } from "@angular/core";
import { DatePipe, formatDate } from "@angular/common";

export const seelctTransactionsState =
  createFeatureSelector<fromTransactions.TransactionsState>(
    fromTransactions.transactionsFeatureKey
  );

export const selectAllTransactions = createSelector(
  seelctTransactionsState,
  fromTransactions.selectAll
);

export const areTransactionsLoaded = createSelector(
  seelctTransactionsState,
  (state) => state.allTransactionsLoaded
);

export const selectFilterByDateTransactions = (date: Moment | null) =>
  createSelector(selectAllTransactions, (transactions) => {
    //const datePipe = inject(DatePipe);
    return transactions.filter(
      (transaction: Transaction) =>
        new DatePipe("en-US").transform(
          transaction.transactionDate,
          "yyyy-MM"
        ) === new DatePipe("en-US").transform(date?.toLocaleString(), "yyyy-MM")
    );
  });

export const selectExpenseTransactions = createSelector(
  selectAllTransactions,
  (transactions) =>
    transactions.filter(
      (transaction: Transaction) => transaction.type === "expense"
    )
);

export const selectIncomeTransactions = createSelector(
  selectAllTransactions,
  (transactions) =>
    transactions.filter(
      (transaction: Transaction) => transaction.type === "income"
    )
);

export const selectExpenseFilterByDateTransactions = (date: Moment | null) =>
  createSelector(selectFilterByDateTransactions(date), (transactions) =>
    transactions.filter(
      (transaction: Transaction) => transaction.type === "expense"
    )
  );

export const selectIncomeFilterByDateTransactions = (date: Moment | null) =>
  createSelector(selectFilterByDateTransactions(date), (transactions) =>
    transactions.filter(
      (transaction: Transaction) => transaction.type === "income"
    )
  );

export const selectTotalExpenseFilterByDateTransactions = (
  date: Moment | null
) =>
  createSelector(selectFilterByDateTransactions(date), (transactions) =>
    transactions
      .filter((transaction: Transaction) => transaction.type === "expense")
      .reduce(
        (total: number, transaction: Transaction) => total + transaction.amount,
        0
      )
  );

export const selectTotalIncomeFilterByDateTransactions = (
  date: Moment | null
) =>
  createSelector(selectFilterByDateTransactions(date), (transactions) =>
    transactions
      .filter((transaction: Transaction) => transaction.type === "income")
      .reduce(
        (total: number, transaction: Transaction) => total + transaction.amount,
        0
      )
  );

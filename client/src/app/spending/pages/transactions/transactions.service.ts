import { Injectable } from "@angular/core";
import { Transaction } from "../../model/transaction";
import moment, { Moment } from "moment";
import { DatePipe } from "@angular/common";
import { Category } from "../../model/category";
import { CategoryTransaction } from "../../model/categoryTransaction";
import { SpendingData } from "../../model/spending";
import { PieChartSeriesData } from "../../model/pieChartSeriesData";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable, combineLatest } from "rxjs";
import {
  selectExpenseFilterByDateTransactions,
  selectFilterByDateTransactions,
  selectTotalExpenseFilterByDateTransactions,
  selectTotalIncomeFilterByDateTransactions,
} from "../../states/transactions/transactions.selectors";
import { map } from "rxjs/operators";

@Injectable()
export class TransactionsService {
  constructor(
    private store: Store,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  /* fetchSpendingData(filterDateValue: Moment | null) {
    console.log(filterDateValue);
    return combineLatest([
      this.store.select(selectExpenseFilterByDateTransactions(filterDateValue)),
      this.store.select(
        selectTotalExpenseFilterByDateTransactions(filterDateValue)
      ),
      this.store.select(
        selectTotalIncomeFilterByDateTransactions(filterDateValue)
      ),
    ]).pipe(
      map(([expenseTransactions, totalExpense, totalIncome]) => {
        console.log(expenseTransactions);
        const balance = totalIncome - totalExpense;
        const balancePercentage =
          totalExpense === 0 && totalIncome === 0
            ? 50
            : 100 - (totalExpense / totalIncome) * 100;
        const categoryExpenseTransactions = this.groupByCategoryTransaction(
          expenseTransactions,
          (transaction: Transaction) => transaction.category._id
        );

        const categoriesChartData = categoryExpenseTransactions.map(
          (data: CategoryTransaction) =>
            <PieChartSeriesData>{
              name: data.category.name,
              y: data.category.totalAmount,
              color: data.category.chartColor,
            }
        );

        return {
          totalExpense,
          totalIncome,
          balance,
          balancePercentage,
          categoryExpenseTransactions,
          categoriesChartData,
        };
      })
    );
  } */

  fetchSpendingData(
    filterDateValue: Moment | null,
    transactions: Transaction[]
  ): SpendingData {
    const filterByDateTransactions = this.filterByDate(
      filterDateValue,
      transactions
    );
    const totalExpense = this.filterByTypeAndGetTotal(
      "expense",
      filterByDateTransactions
    );
    const totalIncome = this.filterByTypeAndGetTotal(
      "income",
      filterByDateTransactions
    );
    const expenseTransactions = this.filterByType(
      "expense",
      filterByDateTransactions
    );
    const balance = totalIncome - totalExpense;
    const balancePercentage =
      totalExpense === 0 && totalIncome === 0
        ? 50
        : 100 - (totalExpense / totalIncome) * 100;
    const categoryExpenseTransactions = this.groupByCategoryTransaction(
      expenseTransactions,
      (transaction: Transaction) => transaction.category._id
    );

    const categoriesChartData = categoryExpenseTransactions.map(
      (data: CategoryTransaction) =>
        <PieChartSeriesData>{
          name: data.category.name,
          y: data.category.totalAmount,
          color: data.category.chartColor,
        }
    );

    return {
      totalExpense,
      totalIncome,
      balance,
      balancePercentage,
      categoryExpenseTransactions,
      categoriesChartData,
    };
  }

  filterByDate(
    filterDateValue: Moment | null,
    transactions: Transaction[]
  ): Transaction[] {
    return transactions.filter(
      (transaction: Transaction) =>
        this.datePipe.transform(transaction.transactionDate, "yyyy-MM") ===
        this.datePipe.transform(filterDateValue?.toLocaleString(), "yyyy-MM")
    );
  }

  filterByType(type: string, transactions: Transaction[]): Transaction[] {
    return transactions.filter((transaction) => transaction.type === type);
  }

  filterByTypeAndGetTotal(type: string, transactions: Transaction[]): number {
    return this.filterByType(type, transactions).reduce(
      (total: number, transaction: Transaction) => total + transaction.amount,
      0
    );
  }

  groupByCategoryTransaction(data: Transaction[], keyFn: Function): any {
    return Object.values(
      data.reduce((agg, item) => {
        const group = <string>keyFn(item);
        let category = <Category>item.category;
        const transactions = [
          ...(agg[group]?.transactions || []),
          <Transaction>item,
        ];
        const totalAmount = transactions.reduce((a, b) => +a + +b.amount, 0);
        category = { ...category, totalAmount };
        const categoryTransaction = <CategoryTransaction>{
          category: category,
          transactions: transactions,
        };
        agg[group] = categoryTransaction;
        return agg;
      }, {})
    );
  }

  groupTotalAmountByMonthAndYear(transactions: Transaction[]) {
    const fromDate = moment().subtract(12, "months");
    const toDate = moment();

    const filteredTransactions = transactions.filter(
      (transaction: Transaction) =>
        moment(transaction.transactionDate).isBetween(fromDate, toDate)
    );

    return filteredTransactions.reduce(
      (result: any, transaction: Transaction) => {
        const key = this.datePipe.transform(
          transaction.transactionDate,
          "yyyy-MM"
        );
        if (!result[transaction.type]) result[transaction.type] = [];
        if (key) {
          result[transaction.type][key] =
            (result[transaction.type][key] || 0) + transaction.amount;
        }
        return result;
      },
      {}
    );
  }
}

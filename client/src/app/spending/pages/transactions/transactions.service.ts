import { Injectable } from "@angular/core";
import { Transaction } from "../../models/transaction";
import moment, { Moment } from "moment";
import { DatePipe } from "@angular/common";
import { Category } from "../../models/category";
import { CategoryTransaction } from "../../models/categoryTransaction";
import { SpendingData } from "../../models/spending";
import { PieChartSeriesData } from "../../models/pieChartSeriesData";

@Injectable()
export class TransactionsService {
  constructor(private datePipe: DatePipe) {}

  fetchSpendingData(transactions: Transaction[]): SpendingData {
    const totalExpense = this.filterByTypeAndGetTotal("expense", transactions);
    const totalIncome = this.filterByTypeAndGetTotal("income", transactions);
    const expenseTransactions = this.filterByType("expense", transactions);
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

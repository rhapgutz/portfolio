import { Transaction } from "./transaction";

export interface TransactionsData {
  transactions: Transaction[];
  totalExpense: number;
  totalIncome: number;
}
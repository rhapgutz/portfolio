import { CategoryTransaction } from "./categoryTransaction";
import { PieChartSeriesData } from "./pieChartSeriesData";

export interface SpendingData {
  totalExpense: number;
  totalIncome: number;
  balance: number;
  balancePercentage: number;
  categoryExpenseTransactions: CategoryTransaction[];
  categoriesChartData: PieChartSeriesData[];
}

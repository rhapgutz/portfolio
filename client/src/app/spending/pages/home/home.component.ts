import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  of,
  zip,
} from "rxjs";
import { Transaction } from "../../model/transaction";
import { TransactionsStore } from "../../services/transactions.store";
import {
  groupBy,
  map,
  mergeMap,
  shareReplay,
  tap,
  toArray,
} from "rxjs/operators";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { CategoryTransaction } from "../../model/categoryTransaction";
import { SpendingData } from "../../model/spending";
import { FilterDateService } from "../../components/filter-date/filter-date.service";
import { TransactionsService } from "../transactions/transactions.service";
import { PieChartSeriesData } from "../../model/pieChartSeriesData";
import { DatePipe } from "@angular/common";
import { ChartStore } from "../../services/chart.store";
import { Store } from "@ngrx/store";
import {
  selectExpenseFilterByDateTransactions,
  selectFilterByDateTransactions,
  selectTotalExpenseFilterByDateTransactions,
  selectTotalIncomeFilterByDateTransactions,
} from "../../states/transactions/transactions.selectors";

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  spendingData$: Observable<SpendingData>;

  constructor(
    private store: Store,
    private transactionsStore: TransactionsStore,
    private filterDateService: FilterDateService,
    private transactionsService: TransactionsService,
    private chartStore: ChartStore
  ) {}

  ngOnInit(): void {
    this.spendingData$ = this.filterDateService.filterDateValue$.pipe(
      mergeMap((date) => {
        return combineLatest([
          this.store.select(selectExpenseFilterByDateTransactions(date)),
          this.store.select(selectTotalExpenseFilterByDateTransactions(date)),
          this.store.select(selectTotalIncomeFilterByDateTransactions(date)),
        ]);
      }),
      map(([expenseTransactions, totalExpense, totalIncome]) => {
        const balance = totalIncome - totalExpense;
        const balancePercentage =
          totalExpense === 0 && totalIncome === 0
            ? 50
            : 100 - (totalExpense / totalIncome) * 100;
        const categoryExpenseTransactions =
          this.transactionsService.groupByCategoryTransaction(
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

    this.spendingData$.subscribe((spendingData) => {
      console.log(spendingData);
      this.chartStore.setChartData(spendingData.categoriesChartData);
    });
  }
}

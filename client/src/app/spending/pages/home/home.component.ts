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
import { TransactionEntityService } from "../../services/transactions/transaction-entity.service";

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
    private chartStore: ChartStore,
    private transactionEntityService: TransactionEntityService
  ) {}

  ngOnInit(): void {
    this.spendingData$ = combineLatest([
      this.filterDateService.filterDateValue$,
      this.transactionEntityService.entities$,
    ]).pipe(
      map(([filterDateValue, transactions]) => {
        return this.transactionsService.fetchSpendingData(
          filterDateValue,
          transactions
        );
      })
    );

    this.spendingData$.subscribe((spendingData) => {
      console.log(spendingData);
      this.chartStore.setChartData(spendingData.categoriesChartData);
    });
  }
}

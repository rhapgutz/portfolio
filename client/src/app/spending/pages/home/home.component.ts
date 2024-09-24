import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { SpendingData } from "../../model/spending";
import { FilterDateService } from "../../components/filter-date/filter-date.service";
import { TransactionsService } from "../transactions/transactions.service";
import { ChartStore } from "../../services/chart.store";
import { TransactionEntityService } from "../../services/transactions/transaction-entity.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TransactionDialogComponent } from "../../components/transaction-dialog/transaction-dialog.component";
import { DialogRef } from "@angular/cdk/dialog";

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
    private dialog: MatDialog,
    private transactionsService: TransactionsService,
    private chartStore: ChartStore,
    private transactionEntityService: TransactionEntityService
  ) {}

  ngOnInit(): void {
    this.spendingData$ = this.transactionEntityService.filteredEntities$.pipe(
      map((transactions) => {
        return this.transactionsService.fetchSpendingData(transactions);
      })
    );

    this.spendingData$.subscribe((spendingData) => {
      this.chartStore.setChartData(spendingData.categoriesChartData);
    });
  }

  onAddNewTransaction() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "400px";
    dialogConfig.data = {
      dialogTitle: "New Transaction",
      mode: "create",
    };

    const dialogRef = this.dialog.open(
      TransactionDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe();
  }
}

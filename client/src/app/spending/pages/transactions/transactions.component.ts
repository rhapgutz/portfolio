import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../../model/transaction";
import { map, tap } from "rxjs/operators";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TransactionDialogComponent } from "../../components/transaction-dialog/transaction-dialog.component";
import { FilterDateService } from "../../components/filter-date/filter-date.service";
import { TransactionsData } from "../../model/transactionsData";
import { TransactionsService } from "./transactions.service";
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
  selector: "transactions",
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  transactionsData$: Observable<TransactionsData>;

  constructor(
    private dialog: MatDialog,
    private transactionEntityService: TransactionEntityService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.transactionsData$ =
      this.transactionEntityService.filteredEntities$.pipe(
        map((transactions) => {
          const totalExpense = this.transactionsService.filterByTypeAndGetTotal(
            "expense",
            transactions
          );
          const totalIncome = this.transactionsService.filterByTypeAndGetTotal(
            "income",
            transactions
          );

          return { transactions, totalExpense, totalIncome };
        })
      );
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

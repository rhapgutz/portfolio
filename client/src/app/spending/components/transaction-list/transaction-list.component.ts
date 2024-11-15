import { Component, Input, OnInit } from "@angular/core";
import { Transaction } from "../../models/transaction";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

@Component({
  selector: "transaction-list",
  templateUrl: "./transaction-list.component.html",
  styleUrl: "./transaction-list.component.scss",
})
export class TransactionListComponent implements OnInit {
  @Input()
  transactions: Transaction[];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEditTransaction(transaction: Transaction): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "400px";
    dialogConfig.data = {
      dialogTitle: "Edit Transaction",
      mode: "update",
      transaction,
    };

    const dialogRef = this.dialog.open(
      TransactionDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe();
  }
}

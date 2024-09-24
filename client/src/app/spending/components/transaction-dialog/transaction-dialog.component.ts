import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Transaction } from "../../model/transaction";
import { combineLatest, Observable } from "rxjs";
import { Category } from "../../model/category";
import { map, startWith, tap } from "rxjs/operators";
import { CategoryEntityService } from "../../services/categories/category-entity.service";
import { TransactionEntityService } from "../../services/transactions/transaction-entity.service";
import moment from "moment";

@Component({
  selector: "transaction-dialog",
  templateUrl: "./transaction-dialog.component.html",
  styleUrl: "./transaction-dialog.component.scss",
})
export class TransactionDialogComponent implements OnInit {
  title: string = "New";
  defaultTypeValue: string = "expense";
  form: FormGroup;
  transaction: Transaction;
  categories$: Observable<Category[]>;
  mode: "update" | "create";

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private categoriesService: CategoryEntityService,
    private transactionsService: TransactionEntityService
  ) {
    this.title = data.dialogTitle;
    this.transaction = data.transaction;
    this.mode = data.mode;

    const formControls = {
      type: ["expense", Validators.required],
      transactionDate: [new Date(), Validators.required],
      category: ["", Validators.required],
      amount: ["", Validators.required],
      notes: ["", []],
    };

    this.form = this.fb.group(formControls);

    if (this.mode === "update") {
      this.form.patchValue({ ...data.transaction });
    }
  }

  ngOnInit(): void {
    const transactionTypeInputValue =
      this.form.controls["type"].value || this.defaultTypeValue;
    const transactionTypeInputValueChanges$ = this.form.controls[
      "type"
    ].valueChanges.pipe(startWith(transactionTypeInputValue));

    this.categories$ = combineLatest([
      transactionTypeInputValueChanges$,
      this.categoriesService.entities$,
    ]).pipe(
      map(([transactionTypeValue, categories]) =>
        categories.filter(
          (category: Category) => category.type === transactionTypeValue
        )
      ),
      tap(console.log)
    );
  }

  onChange(event: any) {
    console.log(event);
  }

  onSave() {
    const transaction: Transaction = {
      ...this.transaction,
      ...this.form.value,
    };

    transaction.transactionDate = moment(transaction.transactionDate).format(
      "YYYY-MM-DD"
    );

    if (this.mode === "update") {
      this.transactionsService.update(transaction);
      this.dialogRef.close();
    } else if (this.mode === "create") {
      this.transactionsService.add(transaction).subscribe((newTransaction) => {
        this.dialogRef.close();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

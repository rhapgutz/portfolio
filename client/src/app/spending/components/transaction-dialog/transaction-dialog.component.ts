import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Transaction } from "../../model/transaction";
import { TransactionsStore } from "../../services/transactions.store";
import { combineLatest, Observable } from "rxjs";
import { Category } from "../../model/category";
import { CategoriesStore } from "../../services/categories.store";
import { map, startWith, tap } from "rxjs/operators";

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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) transaction: Transaction,
    private transactionsStore: TransactionsStore,
    private categoriesStore: CategoriesStore
  ) {
    this.transaction = transaction;
    this.form = this.fb.group({
      type: [transaction?.type, Validators.required],
      transactionDate: [transaction?.transactionDate, Validators.required],
      category: [transaction?.category?._id, Validators.required],
      amount: [transaction?.amount, Validators.required],
      notes: [transaction?.notes],
    });
    if (!transaction) {
      this.form.controls["transactionDate"].setValue(new Date());
      this.form.controls["type"].setValue(this.defaultTypeValue);
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
      this.categoriesStore.categories$,
    ]).pipe(
      map(([transactionTypeValue, categories]) =>
        categories.filter(
          (category: Category) => category.type === transactionTypeValue
        )
      ),
      tap(console.log)
    );
  }

  save() {}

  close() {
    this.dialogRef.close();
  }
}

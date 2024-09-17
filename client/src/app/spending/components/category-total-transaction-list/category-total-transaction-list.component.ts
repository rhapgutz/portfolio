import { Component, Input, OnInit } from "@angular/core";
import { CategoryTransaction } from "../../model/categoryTransaction";

@Component({
  selector: "category-total-transaction-list",
  templateUrl: "./category-total-transaction-list.component.html",
  styleUrl: "./category-total-transaction-list.component.scss",
})
export class CategoryTotalTransactionListComponent implements OnInit {
  @Input()
  categoryTransactions: CategoryTransaction[];

  @Input()
  expenseTotal: number;

  @Input()
  incomeTotal: number;

  @Input()
  balance: number;

  constructor() {}

  ngOnInit(): void {}
}

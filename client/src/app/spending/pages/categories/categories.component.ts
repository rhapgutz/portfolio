import { Component, OnInit } from "@angular/core";
import { Category } from "../../model/category";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CategoriesStore } from "../../services/categories.store";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CategoryDialogComponent } from "../../components/category-dialog/category-dialog.component";
import { Store } from "@ngrx/store";
import {
  selectExpenseCategories,
  selectIncomeCategories,
} from "../../states/categories/categories.selectors";
import { CategoryEntityService } from "../../services/categories/category-entity.service";

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent implements OnInit {
  expenseCategories$: Observable<Category[]>;
  incomeCategories$: Observable<Category[]>;

  constructor(
    private categoriesService: CategoryEntityService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.expenseCategories$ = this.categoriesService.entities$.pipe(
      map((categories) =>
        categories.filter((category) => category.type === "expense")
      )
    );
    this.incomeCategories$ = this.categoriesService.entities$.pipe(
      map((categories) =>
        categories.filter((category) => category.type === "income")
      )
    );
    /* this.expenseCategories$ = this.categoriesStore.filterByType("expense");
    this.incomeCategories$ = this.categoriesStore.filterByType("income"); */
    /* this.expenseCategories$ = this.store.select<Category[]>(
      selectExpenseCategories
    );
    this.incomeCategories$ = this.store.select<Category[]>(
      selectIncomeCategories
    ); */
  }

  onAddNewCategory() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "400px";
    dialogConfig.data = {
      dialogTitle: "New Category",
      mode: "create",
    };

    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }
}

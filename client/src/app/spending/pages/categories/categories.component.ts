import { Component, OnInit } from "@angular/core";
import { Category } from "../../model/category";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CategoryDialogComponent } from "../../components/category-dialog/category-dialog.component";
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

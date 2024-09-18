import { Component, Input, OnInit } from "@angular/core";
import { Category } from "../../model/category";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CategoriesStore } from "../../services/categories.store";
import { CategoryDialogComponent } from "../category-dialog/category-dialog.component";
import { CategoryEntityService } from "../../services/categories/category-entity.service";

@Component({
  selector: "category-list",
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.scss",
})
export class CategoryListComponent implements OnInit {
  @Input()
  categories: Category[];

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoryEntityService
  ) {}

  ngOnInit(): void {
    return;
  }

  onEditCategory(category: Category): void {
    console.log(category);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "400px";

    const { _id, type, name, icon, chartColor } = category;

    dialogConfig.data = {
      dialogTitle: "Edit Category",
      mode: "update",
      category: { _id, type, name, icon, chartColor },
    };

    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  onDelete(category: Category) {
    if (category) {
      if (window.confirm("Are sure you want to delete this category?")) {
        //put your delete method logic here
        this.categoriesService.delete(category);
      }
    }
  }
}

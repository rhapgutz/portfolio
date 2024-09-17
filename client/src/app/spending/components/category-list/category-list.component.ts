import { Component, Input, OnInit } from "@angular/core";
import { Category } from "../../model/category";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CategoriesStore } from "../../services/categories.store";
import { CategoryDialogComponent } from "../category-dialog/category-dialog.component";

@Component({
  selector: "category-list",
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.scss",
})
export class CategoryListComponent implements OnInit {
  @Input()
  categories: Category[];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    return;
  }

  onEditCategory(category: Category): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "400px";

    dialogConfig.data = category;

    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }
}

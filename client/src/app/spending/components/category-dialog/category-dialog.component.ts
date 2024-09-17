import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../model/category";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriesStore } from "../../services/categories.store";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "category-dialog",
  templateUrl: "./category-dialog.component.html",
  styleUrl: "./category-dialog.component.scss",
})
export class CategoryDialogComponent implements OnInit {
  title: string;
  form: FormGroup;
  category: Category;
  defaultIcon: string = "paid";
  selectedIcon: string = "none";
  selectedChartColor: string;

  private showIconSubject = new BehaviorSubject<boolean>(false);
  showIcon$: Observable<boolean> = this.showIconSubject.asObservable();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) category: Category,
    private categoriesStore: CategoriesStore
  ) {
    this.category = category;
    this.form = this.fb.group({
      type: [category?.type || "expense", Validators.required],
      name: [category?.name, Validators.required],
      icon: [category?.icon],
      chartColor: [category?.chartColor],
    });
  }

  ngOnInit(): void {
    this.selectedIcon = this.category?.icon || "sell";
    this.selectedChartColor = this.category?.chartColor || "#cccccc";
    this.title = this.category ? `Edit ${this.category.name}` : `New Category`;
    this.showIcon$.subscribe();
    const showIconByDefault =
      (this.selectedIcon && this.selectedIcon !== "none") === true;
    this.toggleShowIconSubject(showIconByDefault);
  }

  save() {
    const changes = this.form.value;
    const observer = {
      next: () => this.dialogRef.close(changes),
    };
    if (this.category) {
      this.categoriesStore
        .saveCategory(this.category._id, changes)
        .subscribe(observer);
    } else {
      this.categoriesStore.createCategory(changes).subscribe(observer);
    }
  }

  delete() {
    if (this.category) {
      if (window.confirm("Are sure you want to delete this item ?")) {
        //put your delete method logic here
        this.categoriesStore
          .deleteCategory(this.category._id)
          .subscribe(() => this.close());
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  onIconPickerSelect(icon: string): void {
    if (icon && icon !== "none") {
      this.form.controls["icon"].setValue(icon);
      this.selectedIcon = icon;
      this.toggleShowIconSubject(true);
    }
  }

  onColorPickerChange(color: string): void {
    this.form.controls["chartColor"].setValue(color);
  }

  resetIcon() {
    this.form.controls["icon"].setValue("");
    this.selectedIcon = "";
    this.toggleShowIconSubject(false);
  }

  private toggleShowIconSubject(show: boolean): void {
    this.showIconSubject.next(show);
  }
}

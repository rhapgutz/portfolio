import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../model/category";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { CategoryEntityService } from "../../services/categories/category-entity.service";

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
  mode: "update" | "create";

  private showIconSubject = new BehaviorSubject<boolean>(false);
  showIcon$: Observable<boolean> = this.showIconSubject.asObservable();

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private categoriesService: CategoryEntityService
  ) {
    this.title = data.dialogTitle;
    this.category = data.category;
    this.mode = data.mode;

    const formControls = {
      type: ["", Validators.required],
      name: ["", Validators.required],
      icon: ["", []],
      chartColor: ["", []],
    };

    this.form = this.fb.group(formControls);

    if (this.mode === "update") {
      this.form.patchValue({ ...data.category });
    } else if (this.mode === "create") {
      this.form.patchValue({ type: "expense" });
    }

    this.loading$ = this.categoriesService.loading$.pipe(delay(0));
  }

  ngOnInit(): void {
    this.selectedIcon = this.category?.icon || "sell";
    this.selectedChartColor = this.category?.chartColor || "#cccccc";
    this.showIcon$.subscribe();
    const showIconByDefault =
      (this.selectedIcon && this.selectedIcon !== "none") === true;
    this.toggleShowIconSubject(showIconByDefault);
  }

  onSave() {
    const category: Category = {
      ...this.category,
      ...this.form.value,
    };

    if (this.mode === "update") {
      this.categoriesService.update(category);
      this.dialogRef.close();
    } else if (this.mode === "create") {
      this.categoriesService.add(category).subscribe((newCategory) => {
        this.dialogRef.close();
      });
    }
  }

  onDelete() {
    if (this.category) {
      if (window.confirm("Are sure you want to delete this item ?")) {
        //put your delete method logic here
        this.categoriesService.delete(this.category);
        this.dialogRef.close();
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

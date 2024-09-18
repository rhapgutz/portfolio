import { createAction, props } from "@ngrx/store";
import { Category } from "../../model/category";
import { Update } from "@ngrx/entity";

export const loadAllCategories = createAction(
  "[Categories Resolver] Load All Categories"
);

export const allCategoriesLoaded = createAction(
  "[Load Categories Effect] All Categories Loaded",
  props<{ categories: Category[] }>()
);

export const categoryUpdated = createAction(
  "[Edit Category Dialog] Order Update",
  props<{ update: Update<Category> }>()
);

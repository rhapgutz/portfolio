import { createAction, props } from "@ngrx/store";
import { Category } from "../../model/category";

export const loadAllCategories = createAction(
  "[Categories Resolver] Load All Categories"
);

export const allCategoriesLoaded = createAction(
  "[Load Categories Effect] All Categories Loaded",
  props<{ categories: Category[] }>()
);

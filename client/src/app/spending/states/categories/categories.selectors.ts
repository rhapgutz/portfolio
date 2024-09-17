import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCategories from "./categories.reducers";
import { Category } from "../../model/category";

export const selectCategoriesState =
  createFeatureSelector<fromCategories.CategoriesState>(
    fromCategories.categoriesFeatureKey
  );

export const selectAllCategories = createSelector(
  selectCategoriesState,
  fromCategories.selectAll
);

export const areCategoriesLoaded = createSelector(
  selectCategoriesState,
  (state) => state.allCategoriesLoaded
);

export const selectExpenseCategories = createSelector(
  selectAllCategories,
  (categories) =>
    categories.filter((category: Category) => category.type === "expense")
);

export const selectIncomeCategories = createSelector(
  selectAllCategories,
  (categories) =>
    categories.filter((category: Category) => category.type === "income")
);

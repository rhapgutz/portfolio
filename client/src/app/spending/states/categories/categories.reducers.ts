import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Category } from "../../model/category";
import { createReducer, on } from "@ngrx/store";
import { CategoriesActions } from "../action-types";

export const categoriesFeatureKey = "categories";

export interface CategoriesState extends EntityState<Category> {
  allCategoriesLoaded: boolean;
  selectedCategoryId: string | null;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: selectedCategoryId,
});

export function selectedCategoryId(a: Category): string {
  return a._id;
}

export const initialCatgoriesState = adapter.getInitialState({
  allCategoriesLoaded: false,
});

export const categoriesReducer = createReducer(
  initialCatgoriesState,
  on(CategoriesActions.allCategoriesLoaded, (state, action) =>
    adapter.setAll(action.categories, { ...state, allCategoriesLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();

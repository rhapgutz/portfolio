import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { areCategoriesLoaded } from "./categories.selectors";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCategories } from "./category.actions";

export const CategoriesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let loading = false;
  const store = inject(Store<AppState>);

  return store.pipe(
    select(areCategoriesLoaded),
    tap((categoriesLoaded) => {
      if (!loading && !categoriesLoaded) {
        loading = true;
        store.dispatch(loadAllCategories());
      }
    }),
    filter((categoriesLoaded) => categoriesLoaded),
    first(),
    finalize(() => (loading = false))
  );
};

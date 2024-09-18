import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CategoriesActions } from "../action-types";
import { concatMap, map } from "rxjs/operators";
import { allCategoriesLoaded } from "./category.actions";
import { CategoriesHttpService } from "../../services/categories/categories-http.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.loadAllCategories),
      concatMap((action) => this.categoriesHttpService.findAllCategories()),
      map((categories) => {
        return allCategoriesLoaded({ categories });
      })
    );
  });

  saveCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriesActions.categoryUpdated),
        concatMap((action) =>
          this.categoriesHttpService.saveCategory(
            action.update.id.toString(),
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private categoriesHttpService: CategoriesHttpService
  ) {}
}

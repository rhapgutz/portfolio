import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { filter, first, tap } from "rxjs/operators";
import { CategoryEntityService } from "./category-entity.service";

export const CategoriesResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const categoriesService = inject(CategoryEntityService);
  return categoriesService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        categoriesService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};

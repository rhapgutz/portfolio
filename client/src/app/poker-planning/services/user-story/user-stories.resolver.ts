import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { filter, first, tap } from "rxjs/operators";
import { UserStoryEntityService } from "./user-story-entity.service";

export const UserStoriesResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userStoryEntityService = inject(UserStoryEntityService);
  return userStoryEntityService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        userStoryEntityService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};

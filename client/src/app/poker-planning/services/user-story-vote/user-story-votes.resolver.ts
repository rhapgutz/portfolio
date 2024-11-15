import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { filter, first, tap } from "rxjs/operators";
import { UserStoryVoteEntityService } from "./user-story-vote-entity.service";

export const UserStoryVotesResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userStoryVoteEntityService = inject(UserStoryVoteEntityService);
  return userStoryVoteEntityService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        userStoryVoteEntityService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};

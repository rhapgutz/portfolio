import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { filter, first, tap } from "rxjs/operators";
import { UserMessageEntityService } from "./user-message-entity.service";

export const UserMessagesResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userMessageEntityService = inject(UserMessageEntityService);
  return userMessageEntityService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        userMessageEntityService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};

import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { SpendingModule } from "./spending/spending.module";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./app.effects";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { DefaultDataServiceConfig, EntityDataModule } from "@ngrx/data";
import { AuthModule } from "./auth/auth.module";
import { PokerPlanningModule } from "./poker-planning/poker-planning.module";

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: `${environment.base_api_url}/api/v1/`,
  timeout: 3000, // request timeout
};
@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    SharedModule,
    SpendingModule,
    PokerPlanningModule,
    AuthModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }, provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { HomeComponent } from "./pages/home/home.component";
import { SharedModule } from "../shared/shared.module";
import { IconPickerModule } from "ngx-icon-picker";
import { ColorPickerModule } from "ngx-color-picker";
import { ChartModule } from "angular-highcharts";
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { TransactionListComponent } from "./components/transaction-list/transaction-list.component";
import { CategoryTotalTransactionListComponent } from "./components/category-total-transaction-list/category-total-transaction-list.component";
import { TransactionDialogComponent } from "./components/transaction-dialog/transaction-dialog.component";
import { CategoryDialogComponent } from "./components/category-dialog/category-dialog.component";
import { CategoryTotalTransactionChartComponent } from "./components/category-total-transaction-chart/category-total-transaction-chart.component";
import { FilterDateComponent } from "./components/filter-date/filter-date.component";
import { CategoriesHttpService } from "./services/categories.service";
import { TransactionsHttpService } from "./services/transactionsHttp.service";
import { CategoriesResolver } from "./states/categories/categories.resolver";
import { StoreModule } from "@ngrx/store";
import {
  categoriesFeatureKey,
  categoriesReducer,
} from "./states/categories/categories.reducers";
import {
  transactionsFeatureKey,
  transactionsReducer,
} from "./states/transactions/transactions.reducers";
import { EffectsModule } from "@ngrx/effects";
import { CategoriesEffects } from "./states/categories/categories.effects";
import { TransactionsEffects } from "./states/transactions/transactions.effects";
import { TransactionsResolver } from "./states/transactions/transactions.resolver";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      transactions: TransactionsResolver,
    },
  },
  {
    path: "categories",
    component: CategoriesComponent,
    resolve: {
      categories: CategoriesResolver,
    },
  },
  {
    path: "transactions",
    component: TransactionsComponent,
    resolve: {
      transactions: TransactionsResolver,
    },
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    CategoryListComponent,
    CategoriesComponent,
    TransactionsComponent,
    TransactionListComponent,
    CategoryTotalTransactionListComponent,
    TransactionDialogComponent,
    CategoryDialogComponent,
    CategoryTotalTransactionChartComponent,
    FilterDateComponent,
  ],
  imports: [
    SharedModule,
    IconPickerModule,
    ColorPickerModule,
    ChartModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(categoriesFeatureKey, categoriesReducer),
    StoreModule.forFeature(transactionsFeatureKey, transactionsReducer),
    EffectsModule.forFeature([CategoriesEffects, TransactionsEffects]),
  ],
  providers: [CategoriesHttpService, TransactionsHttpService],
})
export class SpendingModule {}

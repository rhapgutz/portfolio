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
import { CategoriesHttpService } from "./services/categories/categories-http.service";
import { TransactionsHttpService } from "./services/transactions/transactions-http.service";
import { CategoriesResolver } from "./services/categories/categories.resolver";
import { TransactionsResolver } from "./services/transactions/transactions.resolver";
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from "@ngrx/data";
import { CategoryEntityService } from "./services/categories/category-entity.service";
import { CategoriesDataService } from "./services/categories/categories-data.service";
import { Category } from "./model/category";
import { Transaction } from "./model/transaction";
import { TransactionEntityService } from "./services/transactions/transaction-entity.service";
import { TransactionsDataService } from "./services/transactions/transactions-data.service";

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

export function selectedCategoryId(a: Category): string {
  return a._id;
}

export function selectedTransactionId(a: Transaction): string {
  return a._id;
}

const entityMetadata: EntityMetadataMap = {
  Category: {
    selectId: selectedCategoryId,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Transaction: {
    selectId: selectedTransactionId,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};

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
  ],
  providers: [
    CategoriesHttpService,
    TransactionsHttpService,
    CategoryEntityService,
    CategoriesDataService,
    TransactionEntityService,
    TransactionsDataService,
  ],
})
export class SpendingModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private categoriesDataService: CategoriesDataService,
    private transactionsDataService: TransactionsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService("Category", categoriesDataService);
    entityDataService.registerService("Transaction", transactionsDataService);
  }
}

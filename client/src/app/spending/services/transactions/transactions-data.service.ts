import { Injectable } from "@angular/core";
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Transaction } from "../../models/transaction";

@Injectable()
export class TransactionsDataService extends DefaultDataService<Transaction> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super("Transaction", http, httpUrlGenerator);
  }
}

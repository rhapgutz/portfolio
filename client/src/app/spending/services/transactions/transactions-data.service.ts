import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Transaction } from "../../model/transaction";

@Injectable()
export class TransactionsDataService extends DefaultDataService<Transaction> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Transaction", http, httpUrlGenerator);
  }
}

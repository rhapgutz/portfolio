import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Transaction } from "../../model/transaction";

@Injectable()
export class TransactionEntityService extends EntityCollectionServiceBase<Transaction> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Transaction", serviceElementsFactory);
  }
}

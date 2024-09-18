import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Category } from "../../model/category";

@Injectable()
export class CategoryEntityService extends EntityCollectionServiceBase<Category> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Category", serviceElementsFactory);
  }
}

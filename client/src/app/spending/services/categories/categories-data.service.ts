import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Category } from "../../model/category";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class CategoriesDataService extends DefaultDataService<Category> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Category", http, httpUrlGenerator);
  }
}

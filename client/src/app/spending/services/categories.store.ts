import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { Category } from "../models/category";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { LoadingService } from "../components/loading/loading.service";
import { HttpClient } from "@angular/common/http";
import { MessagesService } from "../components/messages/messages.service";
import { ApiResponse } from "../models/api.response";

@Injectable({
  providedIn: "root",
})
export class CategoriesStore {
  private subject = new BehaviorSubject<Category[]>([]);
  categories$: Observable<Category[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService
  ) {
    this.loadCategories();
  }

  private loadCategories() {
    const loadCategories$ = this.http
      .get<Category[]>("/api/v1/categories")
      .pipe(
        catchError((err) => {
          const message = "Could not load categories";
          this.messages.showMessages("error", message);
          console.log(message, err);
          return throwError(err);
        }),
        tap((categories) => this.subject.next(categories))
      );

    this.loading.showLoaderUntilCompleted(loadCategories$).subscribe();
  }

  filterByType(type: string): Observable<Category[]> {
    return this.categories$.pipe(
      map((categories) =>
        categories.filter((category) => category.type === type)
      )
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http
      .delete<ApiResponse>(`/api/v1/categories/${categoryId}`)
      .pipe(
        catchError((err) => {
          const message = "Could not create category";
          console.log(message, err);
          this.messages.showMessages("error", message);
          return throwError(err);
        }),
        map(() => {
          const categories = this.subject.getValue();
          const index = categories.findIndex(
            (category) => category._id == categoryId
          );
          categories.splice(index, 1);
          const newCategories: Category[] = [...categories];

          this.subject.next(newCategories);
        })
      );
  }

  createCategory(changes: Partial<Category>): Observable<any> {
    return this.http.post<ApiResponse>(`/api/v1/categoriesz`, changes).pipe(
      catchError((err) => {
        const message = "Could not create category";
        console.log(message, err);
        this.messages.showMessages("error", message);
        return throwError(err);
      }),
      map((response) => {
        const categories = this.subject.getValue();
        const newCategory: Category = response["data"];
        const newCategories: Category[] = [...categories, { ...newCategory }];

        this.subject.next(newCategories);

        const message = "Category created";
        this.messages.showMessages("success", message);
      }),
      shareReplay()
    );
  }

  saveCategory(
    categoryId: string,
    changes: Partial<Category>
  ): Observable<any> {
    return this.http
      .patch<ApiResponse>(`/api/v1/categories/${categoryId}`, changes)
      .pipe(
        catchError((err) => {
          const message = "Could not save category";
          console.log(message, err);
          this.messages.showMessages("error", message);
          return throwError(err);
        }),
        tap((response) => {
          const categories = this.subject.getValue();
          const index = categories.findIndex(
            (category) => category._id == categoryId
          );
          const newCategory: Category = response["data"];
          const newCategories: Category[] = categories.slice(0);
          newCategories[index] = newCategory;

          this.subject.next(newCategories);
        }),
        shareReplay()
      );
  }
}

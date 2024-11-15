import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../../models/category";
import { catchError, tap } from "rxjs/operators";
import { MessagesService } from "../../components/messages/messages.service";
import { Observable, throwError } from "rxjs";
import { ApiResponse } from "../../models/api.response";

@Injectable()
export class CategoriesHttpService {
  constructor(private http: HttpClient, private messages: MessagesService) {}

  findAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("/api/v1/categories").pipe(
      catchError((err) => {
        const message = "Could not load categories";
        this.messages.showMessages("error", message);
        console.log(message, err);
        return throwError(err);
      })
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
        })
      );
  }
}

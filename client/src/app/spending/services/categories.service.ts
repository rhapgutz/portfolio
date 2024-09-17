import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../model/category";
import { catchError, tap } from "rxjs/operators";
import { MessagesService } from "../components/messages/messages.service";
import { Observable, throwError } from "rxjs";

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
}

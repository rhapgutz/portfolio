import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { LoadingService } from "../components/loading/loading.service";
import { MessagesService } from "../components/messages/messages.service";
import { Category } from "../model/category";
import { catchError, map, tap } from "rxjs/operators";
import { PieChartSeriesData } from "../model/pieChartSeriesData";

@Injectable({
  providedIn: "root",
})
export class ChartStore {
  private subject = new BehaviorSubject<any[]>([]);
  chartData$: Observable<any[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService
  ) {
    this.loadChartData();
  }

  private loadChartData() {
    const loadTransactions$ = this.http
      .get<Category[]>("/api/v1/categories/with-total-amount")
      .pipe(
        map((response) => {
          const categories = response["categories"];
          const chartData = [];
          categories.map((category) => {
            chartData.push(<PieChartSeriesData>{
              name: category.name,
              y: Number(category.totalAmount.$numberDecimal),
              color: category.chartColor,
            });
          });
          return chartData;
        }),
        catchError((err) => {
          const message = "Could not load chartData";
          this.messages.showMessages("error", message);
          console.log(message, err);
          return throwError(err);
        }),
        tap((chartData) => this.subject.next(chartData))
      );

    this.loading.showLoaderUntilCompleted(loadTransactions$).subscribe();
  }

  setChartData(chartData: any[]): void {
    this.subject.next(chartData);
  }
}

import { Injectable } from "@angular/core";
import moment, { Moment } from "moment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class FilterDateService {
  private filterDateSubject = new BehaviorSubject<Moment | null>(moment());
  filterDateValue$: Observable<Moment | null> =
    this.filterDateSubject.asObservable();

  setFilterDateValue(date: Moment | null): void {
    this.filterDateSubject.next(date);
  }
}

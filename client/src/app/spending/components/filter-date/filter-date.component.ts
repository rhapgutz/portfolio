import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import moment, { Moment } from "moment";
import { first, tap } from "rxjs/operators";
import { TransactionEntityService } from "../../services/transactions/transaction-entity.service";

@Component({
  selector: "filter-date",
  templateUrl: "./filter-date.component.html",
  styleUrl: "./filter-date.component.scss",
})
export class FilterDateComponent implements OnInit {
  readonly filterDate = new FormControl(moment());

  defaultDateLoaded = false;

  constructor(private transactionsService: TransactionEntityService) {}

  ngOnInit(): void {
    this.filterDate.valueChanges
      .pipe(
        tap((filterDateValue) => {
          if (this.defaultDateLoaded) {
            this.transactionsService.setFilter({
              date: filterDateValue.toJSON(),
            });
          }
        })
      )
      .subscribe();

    this.transactionsService.filter$
      .pipe(
        tap((filters) => {
          const defaultDate = filters.date ? moment(filters.date) : moment();
          if (!this.defaultDateLoaded) {
            this.defaultDateLoaded = true;
            this.filterDate.setValue(defaultDate);
          }
        }),
        first()
      )
      .subscribe();
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ): void {
    const filterDateValue = this.filterDate.value ?? moment();
    filterDateValue.month(normalizedMonthAndYear.month());
    filterDateValue.year(normalizedMonthAndYear.year());
    this.filterDate.setValue(filterDateValue);
    datepicker.close();
  }
}

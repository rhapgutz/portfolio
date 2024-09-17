import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import moment, { Moment } from "moment";
import { startWith, tap } from "rxjs/operators";
import { FilterDateService } from "./filter-date.service";
import { map } from "highcharts";

@Component({
  selector: "filter-date",
  templateUrl: "./filter-date.component.html",
  styleUrl: "./filter-date.component.scss",
})
export class FilterDateComponent implements OnInit {
  readonly filterDate = new FormControl(moment());

  constructor(private filterDateService: FilterDateService) {}

  ngOnInit(): void {
    const defaultDate = this.filterDate.value ?? moment();
    this.filterDate.valueChanges
      .pipe(
        tap((filterDateValue) =>
          this.filterDateService.setFilterDateValue(filterDateValue)
        )
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

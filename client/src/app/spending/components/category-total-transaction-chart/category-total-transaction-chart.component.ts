import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Chart } from "angular-highcharts";
import { ChartStore } from "../../services/chart.store";
import { FilterDateService } from "../filter-date/filter-date.service";
import { SeriesOptionsType } from "highcharts";

@Component({
  selector: "category-total-transaction-chart",
  templateUrl: "./category-total-transaction-chart.component.html",
  styleUrl: "./category-total-transaction-chart.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTotalTransactionChartComponent implements OnInit {
  chart!: Chart;
  chartOptions: any;

  @Input()
  chartType: string = "line";

  @Input()
  chartTitle: string = "Transactions";

  constructor(
    private chartStore: ChartStore,
    private filterDateService: FilterDateService
  ) {}

  ngOnInit(): void {
    this.init();
    this.chartStore.chartData$.subscribe((chartData) => {
      this.chart.removeSeries(0);
      this.chart.addSeries(
        {
          name: "Total Percentage",
          data: chartData,
          type: "pie",
        },
        true,
        false
      );
    });
  }

  init() {
    const options = {
      chart: {
        plotShadow: false,
      },
      title: {
        text: this.chartTitle,
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: "Total Percentage",
          data: [],
          type: "pie",
        },
      ],
      credits: {
        enabled: false,
      },
      accessibility: {
        enabled: false,
      },
    };
    const chart = new Chart(options as any);
    this.chart = chart;
  }
}

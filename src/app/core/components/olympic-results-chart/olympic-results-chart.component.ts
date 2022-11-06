import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {map, Observable, startWith} from 'rxjs';
import {BarLabelOption, chartSeries} from "./olympic-results-chart-types"


@Component({
  selector: 'app-olympic-results-chart',
  templateUrl: './olympic-results-chart.component.html',
  styleUrls: ['./olympic-results-chart.component.scss']
})
export class OlympicResultsChartComponent implements OnInit {

  namesOfChampions: Array<string> = [];
  mapOfChampions!: Map<string, any>;
  seriesArr: Array<chartSeries> = [];
  options: any;

  model$!: Observable<{ loading: boolean, data?: any }>;

  constructor(private readonly apiService: ApiService) {
  }

  ngOnInit() {

    const labelOption = this.labelOptions();

    this.mapOfChampions = new Map<string, any>();
    let champObj: any = {};
    let champNewObject: chartSeries;

    this.model$ = this.apiService.fetchOlympicResults().pipe(
      map((data) => {
        // get only unique names
        data.forEach((champ) => {
            this.mapOfChampions.set(champ.athlete, champ);
          }
        );
        // get only 5 of champions because each has 3 medal values
        this.namesOfChampions = Array.from(this.mapOfChampions.keys()).slice(0, 5);

        this.takeChampionAndPlaceOptionsForChartInArr(champObj, champNewObject, labelOption);
        this.chartOptionsFromArr(this.seriesArr, this.namesOfChampions);
        return {loading: false, data: data};
      }),
      startWith({loading: true})
    );
  }

  private labelOptions() {
    const labelOption: BarLabelOption = {
      show: true,
      position: 'insideBottom' as BarLabelOption['position'],
      distance: 15 as BarLabelOption['distance'],
      align: 'left' as BarLabelOption['align'],
      verticalAlign: 'middle' as BarLabelOption['verticalAlign'],
      rotate: 90 as BarLabelOption['rotate'],
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {

        }
      }
    };
    return labelOption;
  }

  private takeChampionAndPlaceOptionsForChartInArr(champObj: any, champNewObject: chartSeries, labelOption: BarLabelOption) {
    // fill seriesArr with appropriate fields and values
    this.namesOfChampions.forEach((name) => {
      champObj = this.mapOfChampions.get(name);
      champNewObject = {
        name: name,
        type: 'bar',
        data: [champObj.gold, champObj.silver, champObj.bronze],
        age: champObj.age,
        total: champObj.total,
        animationDelay: 1,
        label: labelOption,
        tooltip: {
          formatter: `${name} ${champObj.age}y.o.: {c} medals` // if total medals needed use ${champObj.total}
        }
      };
      this.seriesArr.push(champNewObject);
    })
  }

  private chartOptionsFromArr(seriesArr: Array<chartSeries>, namesArr: Array<string>) {
    const xAxisData = ['Gold', 'Silver', 'Bronze'];

    this.options = {
      legend: {
        data: namesArr,
        align: 'right',
        orient: 'vertical',
        right: 0,
        top: 'center',
      },
      grid: {
        left: "5%",
        right: "25%"
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },

      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: seriesArr,
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }
}

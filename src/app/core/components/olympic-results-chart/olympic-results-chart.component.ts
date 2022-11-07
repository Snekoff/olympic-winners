import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {map, Observable, startWith} from 'rxjs';
import {BarLabelOption, ChartSeriesType} from "./olympic-results-chart-types"
import {getResults} from './olympic-results-chart.util';


@Component({
  selector: 'app-olympic-results-chart',
  templateUrl: './olympic-results-chart.component.html',
  styleUrls: ['./olympic-results-chart.component.scss']
})
export class OlympicResultsChartComponent implements OnInit {

  namesOfChampions: Array<string> = [];
  arrOfWinners!: Array<any>;
  seriesArr: Array<ChartSeriesType> = [];
  options: any;

  model$!: Observable<{ loading: boolean, data?: any }>;

  constructor(private readonly apiService: ApiService) {
  }

  ngOnInit() {

    const labelOption = this.labelOptionsInit();

    this.model$ = this.apiService.fetchOlympicResults().pipe(
      map((data) => {
        this.arrOfWinners = getResults(data);
        // get only 5 of champions because each has 3 medal values
        this.namesOfChampions = this.arrOfWinners.map((winner) => winner.name);

        this.takeChampionAndPlaceOptionsForChartInArr(labelOption);
        this.chartOptionsFromArr(this.seriesArr, this.namesOfChampions);
        return {loading: false, data: data};
      }),
      startWith({loading: true})
    );
  }

  private labelOptionsInit(show = true,
                       pos = 'insideBottom',
                       dist = 15,
                       align = 'left',
                       verticalAlign = "middle",
                       rotate = 90,
                       fontSize = 16) {
    const labelOption: BarLabelOption = {
      show: show,
      position: pos as BarLabelOption['position'],
      distance: dist as BarLabelOption['distance'],
      align: align as BarLabelOption['align'],
      verticalAlign: verticalAlign as BarLabelOption['verticalAlign'],
      rotate: rotate as BarLabelOption['rotate'],
      formatter: '{c}  {name|{a}}',
      fontSize: fontSize,
      rich: {
        name: {}
      }
    };
    return labelOption;
  }

  private takeChampionAndPlaceOptionsForChartInArr(labelOption: BarLabelOption) {
    // fill seriesArr with appropriate fields and values
    this.arrOfWinners.forEach((champObj: any) => {
      let champNewObject: ChartSeriesType = {
        name: champObj.name,
        type: 'bar',
        data: champObj.data,
        age: champObj.age,
        total: champObj.total,
        animationDelay: 1,
        label: labelOption,
        tooltip: {
          formatter: `${champObj.name} ${champObj.age}y.o.: {c} medals` // if total medals needed use ${champObj.total}
        }
      };
      this.seriesArr.push(champNewObject);
    })
  }

  private chartOptionsFromArr(seriesArr: Array<ChartSeriesType>, namesArr: Array<string>) {
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

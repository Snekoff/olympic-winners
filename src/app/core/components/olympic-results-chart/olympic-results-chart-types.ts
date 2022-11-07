export interface OlympicResultsChartTypes {
  age: number;
  athlete: string;
  bronze: number;
  country: string;
  date: string;
  gold: number;
  silver: number;
  sport: string;
  total: number;
  year: number;
}

export interface ChartSeriesType {
  name: string;
  type: string;
  data: Array<number>;
  age: number;
  animationDelay: number;
  label: BarLabelOption;
  tooltip: any;
  total: number;
}

export type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

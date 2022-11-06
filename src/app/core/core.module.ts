import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { OlympicResultsChartComponent } from './components/olympic-results-chart/olympic-results-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [OlympicResultsChartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    NgxEchartsModule
  ],
  exports: [OlympicResultsChartComponent],
  providers: [ApiService]
})
export class CoreModule { }

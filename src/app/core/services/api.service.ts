import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { OlympicResultsChartTypes } from '../components/olympic-results-chart/olympic-results-chart-types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  fetchOlympicResults(limit = 15): Observable<OlympicResultsChartTypes[]> {
    return this.http.get<OlympicResultsChartTypes[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').pipe(
      map((data) => data/*.slice(0, limit)*/)
    );
  }
}

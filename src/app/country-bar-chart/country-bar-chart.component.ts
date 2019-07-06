import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDistribution, AppState } from '../state/tweet.state';
import { Store, select } from '@ngrx/store';
import * as fromTweetSelector from '../selectors/tweet.selector';


@Component({
  selector: 'app-country-bar-chart',
  templateUrl: './country-bar-chart.component.html',
  styleUrls: ['./country-bar-chart.component.scss']
})
export class CountryBarChartComponent {

  countryDistribution$: Observable<CountryDistribution[]>;
  results: any[];

  // options
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  animations = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Tweets';

  constructor(
    private store: Store<AppState>
  ) {
    this.results = [];
    this.countryDistribution$ = store.pipe(select(fromTweetSelector.selectCountryDistribution));
    this.countryDistribution$.subscribe(distribution => {
      this.results = distribution.slice(0, 10).map(country => ({name: country.countryCode, value: country.count}));
    });
  }

}

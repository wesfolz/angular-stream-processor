import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, UserDistribution } from '../state/tweet.state';
import * as fromTweetSelector from '../selectors/tweet.selector';

@Component({
  selector: 'app-user-pie-chart',
  templateUrl: './user-pie-chart.component.html',
  styleUrls: ['./user-pie-chart.component.scss']
})
export class UserPieChartComponent {

  userDistribution$: Observable<UserDistribution>;
  view: any[] = [600, 200];
  gradient = true;
  animations = false;
  label = 'Tweets';
  results: any[];

  constructor(
    private store: Store<AppState>
  ) {
    this.results = [
      {
        name: 'Verified Tweets',
        value: 0
      },
      {
        name: 'Unverified Tweets',
        value: 0
      }
    ];
    this.userDistribution$ = store.pipe(select(fromTweetSelector.selectUserDistribution));
    this.userDistribution$.subscribe(distribution => {
      this.results = [
        {
          name: 'Verified Tweets',
          value: distribution.numVerified
        },
        {
          name: 'Unverified Tweets',
          value: distribution.numUnverified
        }

      ];
    });
  }
}

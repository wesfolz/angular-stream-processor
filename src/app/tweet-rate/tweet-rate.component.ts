import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state/tweet.state';
import * as fromTweetSelector from '../selectors/tweet.selector';

@Component({
  selector: 'app-tweet-rate',
  templateUrl: './tweet-rate.component.html',
  styleUrls: ['./tweet-rate.component.scss']
})
export class TweetRateComponent {
  rate$: Observable<number>;
  view: any[] = [200, 100];

  // options
  min = 0;
  max = 50;
  units = 'Tweets/Sec';
  animations = false;

  constructor(private store: Store<AppState>) {
    this.rate$ = store.pipe(select(fromTweetSelector.selectTweetRate));
  }
}

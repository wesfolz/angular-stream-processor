import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgxUIModule } from '@swimlane/ngx-ui';

import { AppState } from '../state/tweet.state';
import * as fromTweetSelector from '../selectors/tweet.selector';

@Component({
  selector: 'app-tweet-counter',
  templateUrl: './tweet-counter.component.html',
  styleUrls: ['./tweet-counter.component.scss'],
})
export class TweetCounterComponent {
  count$: Observable<number>;
  message$: Observable<string>;

  constructor(private store: Store<AppState>) {
    // console.log(fromTweetSelector);
    this.count$ = store.pipe(select(fromTweetSelector.selectNumTweets));
    this.message$ = store.pipe(select(fromTweetSelector.selectText));
  }
}

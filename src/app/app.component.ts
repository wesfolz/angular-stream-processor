import { Component } from '@angular/core';
import { AppState } from './state/tweet.state';
import { Store } from '@ngrx/store';
import { subscribeToStream, unsubscribeFromStream } from './actions/tweet.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-stream-processor';
  time = 0;
  btnText = 'Start Stream';
  streamStarted = false;
  constructor(
    private store: Store<AppState>
  ) {
  }

  toggleStream() {
    if (this.streamStarted) {
      this.btnText = 'Start Stream';
      this.store.dispatch(unsubscribeFromStream());
    } else {
      this.btnText = 'Stop Stream';
      this.store.dispatch(subscribeToStream());
    }
    this.streamStarted = !this.streamStarted;
  }

}

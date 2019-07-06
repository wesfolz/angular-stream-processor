import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PubNubAngular } from 'pubnub-angular2';
import { Observable } from 'rxjs';
import { AppState, TweetFilter } from './state/tweet.state';
import { newTweet } from './actions/tweet.actions';
import { selectFilter } from './selectors/tweet.selector';


@Injectable({
  providedIn: 'root'
})
export class TwitterStreamService {

  channel = 'pubnub-twitter';
  time = 0;
  filter: TweetFilter;

  constructor(
    private pubnub: PubNubAngular,
    private store: Store<AppState>
  ) {

    this.store.pipe(select(selectFilter)).subscribe(tweetFilter => {
      this.filter = tweetFilter;
      this.time = Date.now();
    });

    this.pubnub.init({
      subscribeKey: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
    });
  }

  subscribeToStream() {
    const observable = new Observable<boolean>(subscriber => {
      subscriber.next(true);
      subscriber.complete();
    });

    this.pubnub.subscribe({
      channels: [this.channel],
      triggerEvents: ['message']
    });

    this.pubnub.getMessage(this.channel,  (msg) => {
      const currentTime = Date.now();
      // console.log(msg.message.in_reply_to_status_id);

      const consumeMessage =
        this.filter === TweetFilter.ALL ||
        (this.filter === TweetFilter.ORIGINAL && msg.message.in_reply_to_status_id == null) ||
        (this.filter === TweetFilter.REPLY && msg.message.in_reply_to_status_id != null);

      if (consumeMessage) {
        this.store.dispatch(newTweet({
          text: msg.message.text,
          verified: msg.message.user.verified,
          countryCode: msg.message.place == null ? null : msg.message.place.country_code,
          elapsedTime: currentTime - this.time}));
        }
    });

    this.time = Date.now();
    return observable;
  }

  unsubscribeFromStream() {
    const observable = new Observable<boolean>(subscriber => {
      subscriber.next(true);
      subscriber.complete();
    });

    this.pubnub.unsubscribe({
      channels: [this.channel]
    });
    return observable;
  }

}

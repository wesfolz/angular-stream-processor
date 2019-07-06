import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as StreamActions from '../actions/tweet.actions';
import { TwitterStreamService } from '../twitter-stream.service';


@Injectable()
export class TweetEffects {

  startStream$ = createEffect(() => this.actions$.pipe(
    ofType(StreamActions.subscribeToStream),
    mergeMap(() => this.twitterStreamService.subscribeToStream()
      .pipe(
        map(subscribed => ({type: '[Stream] subscribed', subscribed})),
        catchError(() => EMPTY)
      ))
    )
  );

  stopStream$ = createEffect(() => this.actions$.pipe(
    ofType(StreamActions.unsubscribeFromStream),
    mergeMap(() => this.twitterStreamService.unsubscribeFromStream()
      .pipe(
        map(unsubscribed => ({type: '[Stream] unsubscribed', unsubscribed})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private twitterStreamService: TwitterStreamService
  ) {}
}

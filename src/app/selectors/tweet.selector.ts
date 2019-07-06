import { createSelector } from '@ngrx/store';

import { AppState, TweetsState } from '../state/tweet.state';

export const selectStream = (state: AppState) => state.tweets;

export const selectNumTweets = createSelector(
    selectStream,
    (state: TweetsState) => state.numTweets
);

export const selectText = createSelector(
    selectStream,
    (state: TweetsState) => state.text
);

export const selectTweetRate = createSelector(
    selectStream,
    (state: TweetsState) => state.tweetRate
);

export const selectUserDistribution = createSelector(
    selectStream,
    (state: TweetsState) => state.userDistribution
);

export const selectCountryDistribution = createSelector(
    selectStream,
    (state: TweetsState) => state.countryDistribution
);

export const selectFilter = createSelector(
    selectStream,
    (state: TweetsState) => state.filter
);

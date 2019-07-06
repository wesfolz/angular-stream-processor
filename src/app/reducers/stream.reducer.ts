import {
  Action,
  createReducer,
  on
} from '@ngrx/store';

import { TweetsState, initialState, AppState, CountryDistribution } from '../state/stream.state';
import * as StreamActions from '../actions/stream.actions';

const addCountry = (countryDistribution, country) => {
  if (country == null) {
    return countryDistribution;
  }
  const copiedArray = countryDistribution.slice().sort((a, b) => {
    return b.count - a.count;
  });
  let found = false;

  for (let i = 0; i < copiedArray.length; i++) {
    if (copiedArray[i].countryCode === country) {
      copiedArray[i] = { countryCode: country, count: copiedArray[i].count + 1 };
      found = true;
      break;
    }
  }

  if (!found) {
    copiedArray.push({
      countryCode: country,
      count: 1
    });
  }
  return copiedArray;
};

export const tweetReducer = createReducer(
  initialState,
  on(StreamActions.unsubscribeFromStream, state => ({...state, numTweets: 0, tweetRate: 0})),
  on(StreamActions.setFilter, (state, action) => ({...state, filter: action.filter, numTweets: 0, tweetRate: 0})),
  on(StreamActions.newTweet, (state, action) =>
    ({
      ...state,
      numTweets: state.numTweets + 1,
      text: action.text,
      userDistribution: {
        numVerified: action.verified ? state.userDistribution.numVerified + 1 : state.userDistribution.numVerified,
        numUnverified: action.verified ? state.userDistribution.numUnverified : state.userDistribution.numUnverified + 1
      },
      countryDistribution: addCountry(state.countryDistribution, action.countryCode),
      tweetRate: action.elapsedTime === 0 ? 0 : Math.round((state.numTweets / action.elapsedTime) * 1000)
    })),
);

export function reducer(state: TweetsState | undefined, action: Action) {
  return tweetReducer(state, action);
}

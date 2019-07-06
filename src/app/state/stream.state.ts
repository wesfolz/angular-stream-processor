export enum TweetFilter {
    ALL,
    ORIGINAL,
    REPLY,
}

export interface UserDistribution {
    numVerified: number;
    numUnverified: number;
}

export interface CountryDistribution {
    countryCode: string;
    count: number;
}

export interface TweetsState {
    numTweets: number;
    text: string;
    tweetRate: number;
    userDistribution: UserDistribution;
    countryDistribution: Array<CountryDistribution>;
    filter: TweetFilter;
}

export interface AppState {
    tweets: TweetsState;
}

export const initialState: TweetsState = {
    numTweets: 0,
    text: '',
    tweetRate: 0,
    userDistribution:
    {
        numVerified: 0,
        numUnverified: 0
    },
    countryDistribution: [],
    filter: TweetFilter.ALL
};

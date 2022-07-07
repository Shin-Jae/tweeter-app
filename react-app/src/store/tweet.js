const ALL_TWEETS = "tweets/ALL_TWEETS";

export const allTweets = (tweets) => ({
    type: ALL_TWEETS,
    tweets
})

export const getAllTweets = (userId, following) => async dispatch => {
    const response = await fetch(`/api/tweets/${userId}/${following}`);

    if (response.ok) {
        let tweets = await response.json();
        dispatch(allTweets(tweets));
        return tweets;
    };
};



const initialState = {};

const tweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_TWEETS:
            const tweets = {};
            for (let tweet of action.tweets.tweets) {
                tweets[tweet.id] = tweet;
            };
            return { ...tweets };
        default:
            return state;
    };
};

export default tweetReducer;

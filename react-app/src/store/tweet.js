const ALL_TWEETS = "tweets/ALL_TWEETS";
const GET_ONE = "tweets/GET_ONE";
const POST_TWEET = "tweets/POST_TWEET";
const EDIT_TWEET = "tweets/EDIT_TWEET";

export const allTweets = (tweets) => ({
    type: ALL_TWEETS,
    tweets
})

export const oneTweet = (tweet) => ({
    type: GET_ONE,
    tweet
})

export const postTweet = (tweet) => ({
    type: POST_TWEET,
    tweet
})

export const editTweet = (tweet) => ({
    type: EDIT_TWEET,
    tweet
})

export const getAllTweets = (userId, following) => async dispatch => {
    const response = await fetch(`/api/tweets/${userId}/${following}`);

    if (response.ok) {
        let tweets = await response.json();
        dispatch(allTweets(tweets));
        return tweets;
    };
};

export const getOneTweet = (tweetId) => async dispatch => {
    const response = await fetch(`/api/tweets/${tweetId}`);

    if (response.ok) {
        let tweet = await response.json();
        dispatch(oneTweet(tweet));
        return tweet
    };
};

export const postOneTweet = (userId, content) => async dispatch => {
    const response = await fetch(`/api/tweets/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    });
    if (response.ok) {
        let tweet = await response.json();
        dispatch(postTweet(tweet));
        return tweet;
    };
};

export const editOneTweet = (tweetId, payload) => async dispatch => {
    const response = await fetch(`/api/tweets/${tweetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const tweet = await response.json();
        dispatch(dispatch(editTweet(tweet)));
        return tweet;
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
        case GET_ONE:
            const tweet = {};
            tweet[action.tweet.id] = action.tweet;
            return { ...tweet };
        case EDIT_TWEET:
            const editTweet = { ...state }
            editTweet[action.tweet.id] = action.tweet;
            return editTweet
        default:
            return state;
    };
};

export default tweetReducer;

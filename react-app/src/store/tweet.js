const ALL_TWEETS = "tweets/ALL_TWEETS";
const GET_ONE = "tweets/GET_ONE";
const POST_TWEET = "tweets/POST_TWEET";
const EDIT_TWEET = "tweets/EDIT_TWEET";
const DELETE_TWEET = "tweets/DELETE_TWEET";
const USER_TWEETS = "tweets/USER_TWEETS";
const EXPLORE_TWEETS = "tweets/EXPLORE_TWEETS";

export const allTweets = (tweets) => ({
    type: ALL_TWEETS,
    tweets
})

export const oneTweet = (tweet) => ({
    type: GET_ONE,
    tweet
})

export const exploreTweets = (tweets) => ({
    type: EXPLORE_TWEETS,
    tweets
})

export const postTweet = (tweet) => ({
    type: POST_TWEET,
    tweet
})

export const editTweet = (tweet) => ({
    type: EDIT_TWEET,
    tweet
})

export const deleteTweet = () => ({
    type: DELETE_TWEET
})

export const userTweets = (tweets) => ({
    type: USER_TWEETS,
    tweets
})

export const getAllTweets = (userId) => async dispatch => {
    const response = await fetch(`/api/tweets/${userId}`);

    if (response.ok) {
        let tweets = await response.json();
        dispatch(allTweets(tweets));
        return tweets;
    };
};

export const getExploreTweets = (exploreId) => async dispatch => {
    const response = await fetch(`/api/tweets/explore/${exploreId}`);

    if (response.ok) {
        let tweets = await response.json();
        dispatch(exploreTweets(tweets));
        return tweets;
    };
};

export const getOneTweet = (tweetId) => async dispatch => {
    const response = await fetch(`/api/tweets/onetweet/${tweetId}`);

    if (response.ok) {
        let tweet = await response.json();
        dispatch(oneTweet(tweet));
        return tweet
    };
};

export const getUserTweets = (profileId) => async dispatch => {
    const response = await fetch(`/api/tweets/profile/${profileId}`);

    if (response.ok) {
        let tweets = await response.json();
        dispatch(userTweets(tweets));
        return tweets;
    }
}

export const postOneTweet = (userId, formData) => async dispatch => {
    const response = await fetch(`/api/tweets/${userId}`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
    });
    if (response.ok) {
        let tweet = await response.json();
        dispatch(postTweet(tweet));
        return tweet;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
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
        dispatch(editTweet(tweet));
        return tweet;
    };
};

export const deleteOneTweet = (tweetId) => async dispatch => {
    const response = await fetch(`/api/tweets/${tweetId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteTweet())
    }
}

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
            return action.tweet;
        case EDIT_TWEET:
            const editTweet = { ...state }
            editTweet[action.tweet.id] = action.tweet;
            return editTweet
        case USER_TWEETS:
            const userTweets = {};
            for (let tweet of action.tweets.tweets) {
                userTweets[tweet.id] = tweet;
            };
            return { ...userTweets };
        case EXPLORE_TWEETS:
            const explore = {};
            for (let tweet of action.tweets.tweets) {
                explore[tweet.id] = tweet;
            };
            return { ...explore };
        default:
            return state;
    };
};

export default tweetReducer;

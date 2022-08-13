const ALL_LIKES = "likes/ALL_LIKES";

export const allLikes = (tweets) => ({
    type: ALL_LIKES,
    tweets
})

export const getUserLikes = (userId) => async dispatch => {
    const response = await fetch(`/api/likes/${userId}`);

    if (response.ok) {
        let tweets = await response.json();
        dispatch(allLikes(tweets));
        return tweets;
    };
};

export const likeTweet = (tweetId, userId) => async dispatch => {
    const response = await fetch(`/api/likes/${tweetId}/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        let liked = await response.json();
        dispatch(allLikes(liked))
        return liked;
    }
}

export const unLike = (tweetId, userId) => async dispatch => {
    const response = await fetch(`/api/likes/unlike/${tweetId}/${userId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const unliked = await response.json();
        dispatch(unLike(unliked));
        return unliked;
    }
}

const initialState = {};

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_LIKES:
            const tweetLikes = {};
            const replyLikes = {}
            for (let tweet of action.tweets.tweetLikes) {
                tweetLikes[tweet] = tweet;
            };
            for (let reply of action.tweets.replyLikes) {
                replyLikes[reply] = reply
            }
            return { likesTweet: tweetLikes, likesReply: replyLikes };
        default:
            return state;
    };
};

export default likesReducer;

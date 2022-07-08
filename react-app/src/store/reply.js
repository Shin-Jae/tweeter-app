const GET_REPLIES = "replies/GET_REPIES";
const POST_REPLY = "replies/POST_REPLY";
const EDIT_REPLY = "replies/EDIT_REPLY";

export const getReplies = (replies) => ({
    type: GET_REPLIES,
    replies
})

export const postReply = (reply) => ({
    type: POST_REPLY,
    reply
})

export const tweetReplies = (tweetId) => async dispatch => {
    const response = await fetch(`/api/replies/${tweetId}`);

    if (response.ok) {
        let replies = await response.json();
        dispatch(getReplies(replies));
        return replies;
    };
};

export const postOneReply = (userId, tweetId, payload) => async dispatch => {
    const response = await fetch(`/api/replies/${userId}/${parseInt(tweetId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        let reply = await response.json();
        dispatch(postReply(reply));
        return reply
    }
}

const initialState = {};

const replyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPLIES:
            const replies = {};

            for (let reply of action.replies.replies) {
                replies[reply.id] = reply;
            };
            return { ...replies };
        // case GET_ONE:
        //     return action.tweet;
        // case EDIT_TWEET:
        //     const editTweet = { ...state }
        //     editTweet[action.tweet.id] = action.tweet;
        //     return editTweet
        default:
            return state;
    };
};

export default replyReducer;

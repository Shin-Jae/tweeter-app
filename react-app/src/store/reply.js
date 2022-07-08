const GET_REPLIES = "replies/GET_REPIES";
const POST_REPLY = "replies/POST_REPLY";
const EDIT_REPLY = "replies/EDIT_REPLY";

export const getReplies = (replies) => ({
    type: GET_REPLIES,
    replies
})



export const tweetReplies = (tweetId) => async dispatch => {
    const response = await fetch(`/api/replies/${tweetId}`);

    if (response.ok) {
        let replies = await response.json();
        dispatch(getReplies(replies));
        return replies;
    };
};


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

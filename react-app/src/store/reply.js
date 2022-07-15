const GET_REPLIES = "replies/GET_REPIES";
const POST_REPLY = "replies/POST_REPLY";
const EDIT_REPLY = "replies/EDIT_REPLY";
const DELETE_REPLY = "replies/DELETE_REPLY";

export const getReplies = (replies) => ({
    type: GET_REPLIES,
    replies
})

export const postReply = (reply) => ({
    type: POST_REPLY,
    reply
})

export const editReply = (reply) => ({
    type: EDIT_REPLY,
    reply
})

export const deleteReply = () => ({
    type: DELETE_REPLY
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
        return reply;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const editOneReply = (replyId, payload) => async dispatch => {
    const response = await fetch(`/api/replies/${replyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const reply = await response.json();
        dispatch(dispatch(editReply(reply)));
        return reply;
    }
}

export const deleteOneReply = (replyId) => async dispatch => {
    const response = await fetch(`/api/replies/${replyId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteReply())
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
        case EDIT_REPLY:
            const editReply = { ...state }
            editReply[action.reply.id] = action.reply;
            return editReply
        default:
            return state;
    };
};

export default replyReducer;

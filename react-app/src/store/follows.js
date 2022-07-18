import { authenticate } from "./session";

const ALL_FOLLOWS = "search/ALL_FOLLOWS";
const FOLLOW_USER = "search/FOLLOW_USER";
const UNFOLLOW_USER = "search/UNFOLLOW_USER";

export const allFollows = (follows) => ({
    type: ALL_FOLLOWS,
    follows
})

export const follow = (follow) => ({
    type: FOLLOW_USER,
    follow
})

export const unFollow = (follow) => ({
    type: UNFOLLOW_USER,
    follow
})

export const getAllFollows = (userId) => async dispatch => {
    const response = await fetch(`/api/follows/${userId}`)

    if (response.ok) {
        let follows = await response.json()
        dispatch(allFollows(follows));
        return follows
    }
}


export const followUser = (userId, followingId) => async dispatch => {
    const response = await fetch(`/api/follows/${userId}/${followingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const followed = await response.json();
        dispatch(follow(followed));
        return followed;
    }
}

export const unFollowUser = (userId, followingId) => async dispatch => {
    const response = await fetch(`/api/follows/${userId}/${followingId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const follow = await response.json();
        dispatch(unFollow(follow));
        return follow;
    }
}


const initialState = {}

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_FOLLOWS:
            const follows = {};

            for (let user of action.follows.follows) {
                follows[user.id] = user;
            }
            return { ...follows };
        default:
            return state;

    }
}

export default followReducer;

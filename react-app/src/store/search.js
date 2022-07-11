const ALL_USERS = "search/ALL_USERS";
const FOLLOW_USER = "search/FOLLOW_USER";
const UNFOLLOW_USER = "search/UNFOLLOW_USER";

export const allUsers = (users) => ({
    type: ALL_USERS,
    users
})

export const follow = (user) => ({
    type: FOLLOW_USER,
    user
})

export const unFollow = (user) => ({
    type: UNFOLLOW_USER,
    user
})

export const getAllUsers = () => async dispatch => {
    const response = await fetch(`/api/users/`)

    if (response.ok) {
        let users = await response.json()
        dispatch(allUsers(users));
        return users
    }
}

export const followUser = (userId, followingId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/${followingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const user = await response.json();
        dispatch(follow(user));
        return user;
    }
}

export const unFollowUser = (userId, followingId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/${followingId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const user = await response.json();
        dispatch(unFollow(user));
        return user;
    }
}


const initialState = {}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_USERS:
            const users = {};

            for (let user of action.users.users) {
                users[user.id] = user;
            }
            return { ...users };
        case FOLLOW_USER:
            const user = { ...state }
            user[action.user.id] = action.user;
            return user
        default:
            return state;

    }
}

export default searchReducer;

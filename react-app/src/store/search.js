const ALL_USERS = "search/ALL_USERS";
const UNFOLLOW_USER = "search/UNFOLLOW_USER";

export const allUsers = (users) => ({
    type: ALL_USERS,
    users
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
        default:
            return state;

    }
}

export default searchReducer;

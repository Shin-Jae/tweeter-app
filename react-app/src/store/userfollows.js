const USER_FOLLOWS = "search/USER_FOLLOWS";

export const userFollows = (follows) => ({
    type: USER_FOLLOWS,
    follows
})

export const getUserFollows = (userId) => async dispatch => {
    const response = await fetch(`/api/follows/user/${userId}`)

    if (response.ok) {
        let follows = await response.json()
        dispatch(userFollows(follows));
        return follows
    }
}

const initialState = {}

const userFollowReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_FOLLOWS:
            const follows = {};

            for (let user of action.follows.follows) {
                follows[user.id] = user;
            }
            return { ...follows };
        default:
            return state;

    }
}

export default userFollowReducer;

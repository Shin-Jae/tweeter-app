import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getAllFollows } from "../../store/follows";
import { getAllUsers, unFollowUser } from "../../store/search";
import { getUserFollows } from "../../store/userfollows";
import '../ProfilePage/ProfilePage.css'

function Follow({ followingId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const following = useSelector((state) => state.userFollow);

    const [follows, setFollows] = useState(following[followingId])

    const handleFollow = async () => {
        const ok = await dispatch(followUser(user.id, followingId))
        if (ok) {
            setFollows(!follows)
            await dispatch(getUserFollows(user.id))
            await dispatch(getAllUsers())
            await dispatch(getAllFollows(user.id))
        }
    }
    const handleUnfollow = async () => {
        const ok = await dispatch(unFollowUser(user.id, followingId))
        if (ok) {
            setFollows(!follows)
            await dispatch(getAllUsers())
            await dispatch(getUserFollows(user.id))
            await dispatch(getAllFollows(user.id))
        }
    }

    return (
        <span>
            {!follows
                ?
                <button
                    className='follow-btn'
                    type="button"
                    onClick={handleFollow}
                >Follow
                </button>
                :
                <button
                    className='following-btn'
                    type="button"
                    onClick={handleUnfollow}
                >
                </button>
            }
        </span>
    )
}

export default Follow;

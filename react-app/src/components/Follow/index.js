import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getAllUsers, unFollowUser } from "../../store/search";
import '../ProfilePage/ProfilePage.css'



function Follow({ followingId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const curUser = useSelector((state) => state.session.user.following);
    const following = []
    curUser.forEach(user => following.push(user.id))
    const [follows, setFollows] = useState(!following.includes(parseInt(followingId)))

    const handleFollow = () => {
        const ok = dispatch(followUser(user.id, followingId))
        if (ok) {
            setFollows(!follows)
            dispatch(getAllUsers())
        }
    }
    const handleUnfollow = () => {
        const ok = dispatch(unFollowUser(user.id, followingId))
        if (ok) {
            setFollows(!follows)
            dispatch(getAllUsers())
        }
    }

    return (
        <span>
            {follows
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
                >Following
                </button>
            }
        </span>
    )
}

export default Follow;

import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../store/search";
import '../ProfilePage/ProfilePage.css'



function Follow({ followingId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const curUser = useSelector((state) => state.session.user.following);
    const following = []
    curUser.forEach(user => following.push(user.id))
    console.log('fdafdsfa', followingId, following)
    const handleFollow = () => {
        dispatch(followUser(user.id, followingId))
    }
    const handleUnfollow = () => {
        return
    }

    return (
        <span>
            {!following.includes(parseInt(followingId))
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

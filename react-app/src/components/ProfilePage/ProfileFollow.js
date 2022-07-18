import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { follow, followUser, getAllFollows } from "../../store/follows";
import { getAllUsers, unFollowUser } from "../../store/search";
import { getUserFollows } from "../../store/userfollows";
import './ProfilePage.css'



function ProfileFollow({ followingId }) {
    const { profileId } = useParams()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const following = useSelector((state) => state.userFollow);

    const [follows, setFollows] = useState(false)

    useEffect(() => {
        if (following[parseInt(profileId)]) {
            return setFollows(true)
        } else {
            return setFollows(false)
        }
    }, [profileId, following])

    const handleFollow = async () => {
        const ok = await dispatch(followUser(user.id, followingId))
        if (ok) {
            setFollows(!follows)
            await dispatch(getUserFollows(user.id))
            await dispatch(getAllFollows(user.id))
            await dispatch(getAllUsers())
        }
    }
    const handleUnfollow = async () => {
        const ok = await dispatch(unFollowUser(user.id, followingId))
        if (ok) {
            setFollows(!follows)
            await dispatch(getUserFollows(user.id))
            await dispatch(getAllFollows(user.id))
            await dispatch(getAllUsers())
        }
    }


    return (
        <span>
            {follows === false
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

export default ProfileFollow;

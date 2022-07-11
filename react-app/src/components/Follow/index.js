import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../store/search";



function Follow({ followingId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const handleFollow = () => {
        dispatch(followUser(user.id, followingId))
    }

    return (
        <button
            className='follow-btn'
            type="button"
            onClick={handleFollow}
        >Follow
        </button>
    )
}

export default Follow;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikes, likeTweet, unLike } from "../../store/likes";
import './Likes.css'


function Likes({ count, tweetId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const userLiked = useSelector((state) => state.userLikes)
    const ifUser = userLiked[tweetId]
    let ifLiked = false
    if (ifUser) ifLiked = true
    const [like, setLike] = useState(ifLiked);

    const handleLike = async () => {
        const ok = await dispatch(likeTweet(tweetId, user.id))
        if (ok) {
            await dispatch(getUserLikes(user.id))
            setLike(true)
        }
    }

    const handleUnLike = async () => {
        const ok = await dispatch(unLike(tweetId, user.id))
        if (ok) {
            await dispatch(getUserLikes(user.id))
            setLike(false)
        }
    }


    return (
        <div className="tweet-likes-container">
            <div className="unlike-container" onClick={ifLiked ? handleUnLike : handleLike}>
                <i className={ifLiked ? "fa-solid fa-heart fa-lg like" : "fa-regular fa-heart fa-lg unlike"}></i>
            </div>
            {/* <div className={!like ? "tweet-likes-count" : "tweet-liked-count"}>
                {count?.length}
            </div> */}
            {/* <i class="fa-solid fa-heart"></i> */}
        </div>
    )
}

export default Likes;

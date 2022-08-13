import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeTweet } from "../../store/likes";
import './Likes.css'


function Likes({ count, tweetId }) {
    const dispatch = useDispatch();
    // tweets.likes
    const user = useSelector((state) => state.session.user)
    const userLiked = useSelector((state) => state.userLikes?.likedTweets)
    // console.log('test', userLiked, count)
    const [like, setLike] = useState(userLiked ? true : false);


    const handleLike = async () => {
        const ok = await dispatch(likeTweet(tweetId, user.id))
        if (ok) {
            // await dispatch(getUserLikes(user.id))
            setLike(!like)
        }
    }

    return (
        <div className="tweet-likes-container">
            <div className="unlike-container" onClick={handleLike}>
                <i className={!like ? "fa-regular fa-heart fa-lg unlike" : "fa-solid fa-heart fa-lg like"}></i>
            </div>
            <div className={!like ? "tweet-likes-count" : "tweet-liked-count"}>
                {count.length}
            </div>
            {/* <i class="fa-solid fa-heart"></i> */}
        </div>
    )
}

export default Likes;

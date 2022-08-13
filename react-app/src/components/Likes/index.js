import { useState } from "react";
import './Likes.css'


function Likes({ count }) {
    // tweets.likes
    const [like, setLike] = useState();


    return (
        <div className="tweet-likes-container">
            <div className="unlike-container">
                <i className="fa-regular fa-heart fa-lg unlike"></i>
            </div>
            <div className="tweet-likes-count">
                {count.length}
            </div>
            {/* <i class="fa-solid fa-heart"></i> */}
        </div>
    )
}

export default Likes;

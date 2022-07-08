import React from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";


function Replies() {
    // const { tweetId } = useParams();

    const tweetReplies = useSelector((state) => state.replies);
    const replies = Object.values(tweetReplies);

    return (
        <div>
            replies
            <ul>
                {replies.map(reply => {
                    return <div key={reply.id}>
                        <div>{reply.content}</div>
                    </div>
                })}
            </ul>
        </div>
    )
}

export default Replies;

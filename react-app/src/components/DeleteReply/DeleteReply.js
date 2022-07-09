import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteOneReply, tweetReplies } from "../../store/reply";
import { getOneTweet } from "../../store/tweet";

function DeleteReply({ replyId, onClose }) {
    const dispatch = useDispatch();
    const { tweetId } = useParams();

    const handleDelete = async () => {
        await dispatch(deleteOneReply(replyId))
        await dispatch(getOneTweet(tweetId))
        const success = await dispatch(tweetReplies(tweetId))

        if (success) onClose(false);
    }

    const handleClose = () => {
        return onClose(false)
    }

    return (
        <div>
            <h2>Delete Tweet?</h2>
            <div>
                <p>This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.</p>
            </div>
            <div>
                <button type="button" onClick={handleDelete}>Delete</button>
            </div>
            <div>
                <button type="button" onClick={handleClose}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReply;

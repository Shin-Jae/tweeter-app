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
        <div className="delete-modal-container">
            <div className="delete-tweet-header">Delete Tweet?</div>
            <div>
                <p className="delete-tweet-text">This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.</p>
            </div>
            <div>
                <button className="delete-btns btn-delete-yes" type="button" onClick={handleDelete}>Delete</button>
            </div>
            <div>
                <button className="delete-btns btn-delete-no" type="button" onClick={handleClose}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReply;

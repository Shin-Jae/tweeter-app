import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteOneTweet, getAllTweets, getUserTweets } from "../../store/tweet";
import "./DeleteTweet.css"

function DeleteTweet({ onClose, deleteId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId, tweetId, profileId } = useParams();

    const handleDelete = async () => {
        if (profileId) {
            await dispatch(deleteOneTweet(deleteId))
            const userPage = await dispatch(getUserTweets(userId))
            if (userPage) return onClose(false);
        }
        if (!tweetId) {
            await dispatch(deleteOneTweet(deleteId));
            const getAll = await dispatch(getAllTweets(userId))
            if (getAll) return onClose(false);
        } else {
            await dispatch(deleteOneTweet(tweetId));
            history.push(`/users/${userId}`);
        }
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
                <button type="button" className="delete-btns btn-delete-no" onClick={handleClose}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteTweet;

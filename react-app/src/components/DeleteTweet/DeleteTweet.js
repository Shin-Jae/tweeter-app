import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteOneTweet, getAllTweets } from "../../store/tweet";

function DeleteTweet({ onClose, tweetId }) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const follow = useSelector((state) => state.session.user.following)

    const handleDelete = async () => {
        const following = follow.map(per => {
            return per.id;
        })
        await dispatch(deleteOneTweet(tweetId));
        const getAll = await dispatch(getAllTweets(userId, following))
        if (getAll) return onClose(false);
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

export default DeleteTweet;

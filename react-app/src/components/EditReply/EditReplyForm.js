import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneReply, tweetReplies } from '../../store/reply';
import { getOneTweet } from '../../store/tweet';


function EditReplyForm({ replyId, onClose }) {
    const { tweetId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

        const newReply = await dispatch(editOneReply(replyId, payload));

        if (tweetId && newReply) {
            onClose(false);
            setContent('');
            await dispatch(getOneTweet(tweetId))
            await dispatch(tweetReplies(tweetId))
        };
    };

    return (
        <div>
            <h3>Edit Tweet</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    className='tweet-text-box'
                    type='text'
                    placeholder="What's happened?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    className='submit-tweet-btn'
                    type='submit'
                    disabled={content.length > 280 || !content.length}
                >
                    <span>
                        Tweet
                    </span>
                </button>
            </form>
        </div>
    )
}

export default EditReplyForm;

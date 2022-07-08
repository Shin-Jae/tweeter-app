import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReplies, postOneReply, tweetReplies } from '../../store/reply';
import { getOneTweet } from '../../store/tweet';


function ReplyForm({ tweetId }) {
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

        const newReply = dispatch(postOneReply(userId, tweetId, payload))
        if (newReply) {
            setContent('');
            await dispatch(getOneTweet(tweetId))
            await dispatch(tweetReplies(tweetId));
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className='tweet-text-box'
                    type='text'
                    placeholder="Tweet your reply"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    className='submit-tweet-btn'
                    type='submit'
                    disabled={content.length > 280 || !content.length}
                >
                    <span>
                        Reply
                    </span>
                </button>
            </form>
        </div>
    )
}

export default ReplyForm;

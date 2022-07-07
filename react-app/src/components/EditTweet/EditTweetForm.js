import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneTweet, getAllTweets } from '../../store/tweet';

function EditTweetForm({ tweetId, onClose }) {
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');

    const follow = useSelector((state) => state.session.user.following)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

        const newTweet = await dispatch(editOneTweet(tweetId, payload));
        if (newTweet) {
            const following = follow.map(per => {
                return per.id;
            })
            onClose(false);
            setContent('');
            await dispatch(getAllTweets(userId, following));
        };
    };

    return (
        <div>
            <h3>Edit Tweet</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    className='tweet-text-box'
                    type='text'
                    placeholder="What's happening?"
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

export default EditTweetForm;

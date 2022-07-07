import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneTweet, getAllTweets, getOneTweet } from '../../store/tweet';

function EditTweetForm({ editId, onClose }) {
    const { userId, tweetId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');

    const follow = useSelector((state) => state.session.user.following)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }
        console.log('editTweet', editId)
        const newTweet = await dispatch(editOneTweet(editId, payload));
        if (!tweetId && newTweet) {
            const following = follow.map(per => {
                return per.id;
            })
            onClose(false);
            setContent('');
            await dispatch(getAllTweets(userId, following));
        } else if (tweetId && newTweet) {
            onClose(false);
            setContent('');
            await dispatch(getOneTweet(tweetId))
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

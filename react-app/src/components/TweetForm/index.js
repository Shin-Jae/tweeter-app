import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTweets, postOneTweet } from '../../store/tweet';


function TweetForm() {
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');

    const follow = useSelector((state) => state.session.user.following)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

        const newTweet = await dispatch(postOneTweet(userId, payload));
        if (newTweet) {
            const following = follow.map(per => {
                return per.id;
            })
            setContent('');
            await dispatch(getAllTweets(userId, following));
        };
    };

    return (
        <div>
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

export default TweetForm;

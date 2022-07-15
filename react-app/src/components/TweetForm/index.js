import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTweets, postOneTweet } from '../../store/tweet';
import './TweetForm.css';

function TweetForm() {
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const [zero, setZero] = useState(true);
    const [errors, setError] = useState([]);

    const user = useSelector((state) => state.session.user)
    const follow = useSelector((state) => state.session.user.following)

    useEffect(() => {
        const validationErrors = []
        if (content.length > 280) validationErrors.push("Tweets should be less than 280 characters")
        setError(validationErrors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

        const newTweet = await dispatch(postOneTweet(userId, payload));
        if (Array.isArray(newTweet)) {
            return setError(newTweet)
        }
        if (newTweet) {
            const following = follow.map(per => {
                return per.id;
            })
            setContent('');
            await dispatch(getAllTweets(userId, following));
        }

    };

    return (
        <div className='tweet-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='tweet-errors'>{errors.map((error) => (
                    <div className="errors create-error" key={error}>
                        {error}
                    </div>))}
                </div>
                <div className='tweet-form-profile-img'>
                    <img src={`${user?.profile_img}`} alt='profile-img' className='user-profile-img' />
                </div>
                <textarea
                    className='tweet-text-box'
                    type='text'
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onClick={() => setZero(false)}
                />
                <div className='tweet-submit'>
                    <button
                        className='submit-tweet-btn'
                        type='submit'
                        disabled={content.length > 280 || !content.length}
                    >
                        <span>
                            Tweet
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TweetForm;

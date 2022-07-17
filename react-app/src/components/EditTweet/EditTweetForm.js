import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneTweet, getAllTweets, getOneTweet, getUserTweets } from '../../store/tweet';
import './EditTweet.css'

function EditTweetForm({ editId, onClose }) {
    const { userId, tweetId, profileId } = useParams();
    const dispatch = useDispatch()
    const [errors, setError] = useState([])

    const user = useSelector((state) => state.session.user)
    const tweet = useSelector((state) => state.tweets[editId])

    const [content, setContent] = useState(tweet.content);

    useEffect(() => {
        const validationErrors = []
        if (content.length < 2) validationErrors.push("Tweets should be at lease 2 characters")
        if (content.length > 280) validationErrors.push("Tweets should be within 280 characters")
        setError(validationErrors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

        const newTweet = await dispatch(editOneTweet(editId, payload));
        if (profileId) {
            onClose(false);
            await dispatch(getUserTweets(profileId));
        } else if (!tweetId && newTweet) {
            onClose(false);
            await dispatch(getAllTweets(userId));
        } else if (tweetId && newTweet) {
            onClose(false);
            await dispatch(getOneTweet(tweetId))
        };
    };

    return (
        <div className='edit-tweet-container'>
            <div className='close-edit-modal'>
                <button className='login-close-btn' onClick={() => onClose(false)} type='button'>x</button>
            </div>
            <form onSubmit={handleSubmit} >
                {errors[0] &&
                    <ul className='error__container'>{errors.map((error) => (
                        <li className="errors edit-errors" key={error}>
                            {error}
                        </li>))}
                    </ul>}
                <div className='edit-form-container'>
                    <div className='tweet-form-profile-img edit-form-user'>
                        <img src={`${user?.profile_img}`} alt='profile-img' className='user-profile-img' />
                    </div>
                    <textarea
                        className='tweet-text-box edit-tweet-input'
                        type='text'
                        placeholder="What's happened?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className='submit-edit'>
                    <button
                        className='submit-tweet-btn edit-submit-btn'
                        type='submit'
                        disabled={content.length > 280 || !content.length}
                    >
                        Tweet
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTweetForm;

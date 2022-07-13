import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneTweet, getAllTweets, getOneTweet } from '../../store/tweet';
import './EditTweet.css'

function EditTweetForm({ editId, onClose }) {
    const { userId, tweetId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const [errors, setError] = useState([])

    const follow = useSelector((state) => state.session.user.following)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        const validationErrors = []
        if (content.length > 280 || content.length === 0) validationErrors.push("Tweets should be less than 280 characters")
        setError(validationErrors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReplies, postOneReply, tweetReplies } from '../../store/reply';
import { getOneTweet } from '../../store/tweet';
import './ReplyForm.css'


function ReplyForm({ tweetId }) {
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const [errors, setError] = useState([]);

    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        const validationErrors = []
        if (content.length > 280) validationErrors.push("Replies should be less than 280 characters")
        setError(validationErrors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            content
        }

        const newReply = await dispatch(postOneReply(userId, tweetId, payload))
        if (Array.isArray(newReply)) {
            return setError(newReply)

        }
        if (newReply) {
            setContent('');
            await dispatch(getOneTweet(tweetId))
            await dispatch(tweetReplies(tweetId));
        };
    };

    return (
        <div className='reply-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='tweet-errors'>{errors.map((error) => (
                    <div className="errors create-error" key={error}>
                        {error}
                    </div>))}
                </div>
                <div className='tweet-form-profile-img'>
                    <img src={`${user?.profile_img}`} alt='profile-img' className='user-profile-img' />
                    <textarea
                        className='tweet-text-box reply-text-box'
                        type='text'
                        placeholder="Tweet your reply"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className='submit-reply'>
                        <button
                            className='submit-tweet-btn '
                            type='submit'
                            disabled={content.length > 280 || !content.length}
                        >
                            <span>
                                Reply
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ReplyForm;

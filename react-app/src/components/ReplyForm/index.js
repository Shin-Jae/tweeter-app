import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postOneReply, tweetReplies } from '../../store/reply';
import { getOneTweet } from '../../store/tweet';
import './ReplyForm.css'


function ReplyForm({ tweetId }) {
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const [errors, setError] = useState([]);
    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [choseImage, setChoseImage] = useState(false);

    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        const validationErrors = []
        if (content.length > 280) validationErrors.push("Replies should be less than 280 characters")
        setError(validationErrors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const payload = {
        //     content
        // }
        const formData = new FormData();
        formData.append("image", image);
        formData.append("content", content);
        setImageLoading(true);

        const newReply = await dispatch(postOneReply(userId, tweetId, formData))
        if (Array.isArray(newReply)) {
            setImageLoading(false);
            return setError(newReply)

        }
        if (newReply) {
            setContent('');
            setImageLoading(false);
            setImage(null);
            setChoseImage(false);
            await dispatch(getOneTweet(tweetId))
            await dispatch(tweetReplies(tweetId));
        };
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setChoseImage(true)
        setImage(file);
    }

    return (
        <div className='reply-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='tweet-errors'>{errors.map((error) => (
                    <div className="errors create-error" key={error}>
                        {error}
                    </div>))}
                </div>
                <div className='tweet-form-profile-img '>
                    <img src={`${user?.profile_img}`} alt='profile-img' className='user-profile-img' />
                    <div className='reply-container'>
                        <textarea
                            className='tweet-text-box reply-text-box'
                            type='text'
                            placeholder="Tweet your reply"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className='submit-reply tweet-submit'>
                            <label className='choose-image'>
                                <div className=''>
                                    <input
                                        type="file"
                                        accept="image/*"

                                        onChange={updateImage}
                                        hidden
                                    /></div>
                                <i className="fa-solid fa-image fa-lg image-icon"></i>
                                {choseImage &&
                                    <div className='check-image'>
                                        <i className="fa-solid fa-circle-check fa-md"></i>
                                    </div>
                                }
                            </label>
                            {(imageLoading) && <p>Loading Image...</p>}
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
                </div>
            </form>
        </div>
    )
}

export default ReplyForm;

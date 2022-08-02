import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTweets, postOneTweet } from '../../store/tweet';
import './TweetForm.css';

function TweetForm() {
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [errors, setError] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [choseImage, setChoseImage] = useState(false);

    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        const validationErrors = []
        if (content.length > 280) validationErrors.push("Tweets should be less than 280 characters");
        setError(validationErrors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const payload = {
        //     content,
        //     image
        // }
        const formData = new FormData();
        formData.append("image", image);
        formData.append("content", content);
        setImageLoading(true);

        const newTweet = await dispatch(postOneTweet(userId, formData));
        if (Array.isArray(newTweet)) {
            setImageLoading(false);
            return setError(newTweet)
        }
        if (newTweet) {
            setContent('');
            setImageLoading(false);
            setImage(null);
            setChoseImage(false);
            await dispatch(getAllTweets(userId));
        }


    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setChoseImage(true)
        setImage(file);
    }

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
                />
                <div className='tweet-submit'>
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

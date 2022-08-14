import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getOneTweet } from '../../store/tweet';
import Replies from '../Replies';
import { tweetReplies } from '../../store/reply';
import ReplyForm from '../ReplyForm';
import DropdownModal from '../Tweets/DropdownModal';
import './SingleTweet.css';
import Likes from '../Likes';

function SingleTweet() {
    const dispatch = useDispatch();
    const { userId, tweetId } = useParams();
    const oneTweet = useSelector((state) => state.tweets);

    const test = useSelector((state) => state.search[oneTweet.user_id]);

    useEffect(() => {
        (async () => {
            await dispatch(getOneTweet(tweetId));
            await dispatch(tweetReplies(tweetId));
        })();
    }, [tweetId, dispatch])

    return (
        <div className='homepage'>
            <div className='home-text'>
                Thread
            </div>
            <div>
                {oneTweet.user_id === parseInt(userId) ?
                    <div key={`btn-${oneTweet.id}`} className="one-tweet-edit-btns single-tweet-edit">
                        <DropdownModal tweetId={tweetId} />
                    </div>
                    : null}
                <NavLink to={`/profile/${userId}/${test?.id}`} activeStyle={{ textDecoration: 'none' }} style={{ textDecoration: 'none' }} exact={true} className='user-profile single-tweet-img'>
                    <img src={`${test?.profile_img}`} alt='profile-img' className='user-profile-img' />
                    <div className='user-info single-tweet-info'>
                        <div className='user-fullname' style={{ color: 'black' }}>
                            {test?.name}
                        </div>
                        <div className='user-username single-tweet-username'>
                            @{test?.username}
                        </div>
                    </div>
                </NavLink>
                <div className='single-tweet-content'>
                    <div className='tweet-content-container'>
                        {oneTweet?.content}
                    </div>
                    {oneTweet?.image &&
                        <div className='tweet-image-container single-tweet-image'><img className='tweet-image' src={oneTweet?.image} alt='' /></div>
                    }
                </div>
                <div className='likes-container single-tweet-likes'>
                    <div>
                        <Likes count={oneTweet?.tweet_likes} tweetId={oneTweet?.id} />
                    </div>
                </div>
            </div>
            <div>
                <ReplyForm tweetId={tweetId} />
                <Replies />
            </div>
        </div>
    )
}

export default SingleTweet;

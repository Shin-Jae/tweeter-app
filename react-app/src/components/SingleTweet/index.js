import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getOneTweet } from '../../store/tweet';
import Replies from '../Replies';
import { tweetReplies } from '../../store/reply';
import ReplyForm from '../ReplyForm';
import DropdownModal from '../Tweets/DropdownModal';
import './SingleTweet.css';

function SingleTweet() {
    const dispatch = useDispatch();
    const { userId, tweetId } = useParams();

    const oneTweet = useSelector((state) => state.tweets);

    const allUsers = useSelector((state) => state.search);
    const users = Object.values(allUsers);
    const user = users.filter(one => one.id === oneTweet.user_id);
    let test = user[0]

    useEffect(() => {
        dispatch(getOneTweet(tweetId));
        dispatch(tweetReplies(tweetId));
    }, [tweetId, dispatch])

    return (
        <div className='homepage'>
            <div className='home-text'>
                Thread
            </div>
            <div>
                {oneTweet.user_id === parseInt(userId) ?
                    <div key={`btn-${oneTweet.id}`} className="one-tweet-edit-btns">
                        <DropdownModal tweetId={oneTweet.id} />
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
                    <div>
                        {oneTweet.content}
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

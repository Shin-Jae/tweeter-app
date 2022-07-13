import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneTweet } from '../../store/tweet';
import Replies from '../Replies';
import { tweetReplies } from '../../store/reply';
import ReplyForm from '../ReplyForm';
import DropdownModal from '../Tweets/DropdownModal';

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
            <div>
                {oneTweet.user_id === parseInt(userId) ?
                    <div key={`btn-${oneTweet.id}`} className="one-tweet-edit-btns">
                        <DropdownModal tweetId={oneTweet.id} />
                    </div>
                    : null}
                <div className='user-profile'>
                    <img src={`${test?.profile_img}`} alt='profile-img' className='user-profile-img' />
                    <div className='user-info'>
                        <div className='user-fullname'>
                            {test?.first_name} {test?.last_name}
                        </div>
                        <div className='user-username'>
                            @{test?.username}
                        </div>
                    </div>
                </div>
                <div className='container-tweet-contents'>
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

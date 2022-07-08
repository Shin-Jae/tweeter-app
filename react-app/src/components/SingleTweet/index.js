import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneTweet } from '../../store/tweet';
import EditTweetModal from '../EditTweet';
import DeleteTweetModal from '../DeleteTweet';
import Replies from '../Replies';
import { tweetReplies } from '../../store/reply';

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
                    <div>
                        <span>
                            <EditTweetModal tweetId={tweetId} />
                        </span>
                        <span>
                            <DeleteTweetModal tweetId={tweetId} />
                        </span>
                    </div>
                    : null}
                <div>
                    {test?.first_name}
                </div>
                <div>
                    {oneTweet.content}
                </div>
            </div>
            <div>
                <Replies />
            </div>
        </div>
    )
}

export default SingleTweet;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneTweet } from '../../store/tweet';
import { useDispatch } from 'react-redux';
import EditTweetModal from '../EditTweet';
import DeleteTweetModal from '../DeleteTweet';
import Replies from '../Replies';
import { tweetReplies } from '../../store/reply';

function SingleTweet() {
    const dispatch = useDispatch();
    const { userId, tweetId } = useParams();

    const oneTweet = useSelector((state) => state.tweets);

    useEffect(() => {
        dispatch(getOneTweet(tweetId));
        dispatch(tweetReplies(tweetId));
    }, [tweetId, dispatch])

    return (
        <div>
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

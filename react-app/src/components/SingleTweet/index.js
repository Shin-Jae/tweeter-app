import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneTweet } from '../../store/tweet';
import { useDispatch } from 'react-redux';

function SingleTweet() {
    const dispatch = useDispatch();
    const { tweetId } = useParams();

    const oneTweet = useSelector((state) => state.tweets);
    const tweet = Object.values(oneTweet)[0];

    useEffect(() => {
        dispatch(getOneTweet(tweetId));
    }, [tweetId, dispatch])

    return (
        <div>
            SingleTweet Page
            <div>
                <div>
                    {tweet.content}
                </div>
            </div>
        </div>
    )
}

export default SingleTweet;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllTweets } from '../../store/tweet';
import { useDispatch } from 'react-redux';

function Tweets() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const allTweets = useSelector((state) => state.tweets);
    const follow = useSelector((state) => state.session.user.following)

    const tweets = Object.values(allTweets);

    useEffect(() => {
        const following = follow.map(per => {
            return per.id;
        })

        dispatch(getAllTweets(userId, following));
    }, [userId, follow, dispatch])

    return (
        <div>
            Tweets
            <div>
                <ul>
                    {tweets.map(tweet => {
                        return <NavLink key={tweet.id} exact to={`/${userId}/tweets/${tweet.id}`}>
                            <div>
                                <li key={`tweet-${tweet.id}`}>
                                    <div>{tweet.content}</div>
                                </li>
                            </div>
                        </NavLink>

                    })}
                </ul>
            </div>
        </div>
    )
}

export default Tweets;

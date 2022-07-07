import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

function Tweets() {
    const { userId } = useParams();

    const allTweets = useSelector((state) => state.tweets);

    const tweets = Object.values(allTweets);

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

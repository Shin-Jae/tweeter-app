import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DeleteTweetModal from '../DeleteTweet';
import EditTweetModal from '../EditTweet';

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
                        return <div key={tweet.id}>
                            {tweet.user_id === parseInt(userId) ?
                                <div>
                                    <span>
                                        <EditTweetModal tweetId={tweet.id} />
                                    </span>
                                    <span>
                                        <DeleteTweetModal tweetId={tweet.id} />
                                    </span>
                                </div>
                                : null}
                            <NavLink exact to={`/${userId}/tweets/${tweet.id}`}>
                                <div>
                                    <li key={`tweet-${tweet.id}`}>
                                        <div>{tweet.content}</div>
                                    </li>
                                </div>
                            </NavLink>
                        </div>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Tweets;

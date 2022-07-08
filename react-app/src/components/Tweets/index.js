import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DeleteTweetModal from '../DeleteTweet';
import EditTweetModal from '../EditTweet';
import './Tweets.css'

function Tweets() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    const allTweets = useSelector((state) => state.tweets);
    const allUsers = useSelector((state) => state.search);
    const users = Object.values(allUsers);

    const tweets = Object.values(allTweets);

    return (
        <div>
            Tweets
            <ul style={{ listStyleType: 'none' }}>
                {tweets.map(tweet => {
                    return <div key={tweet.id} className='one-tweet-container'>
                        <div className='tweet-borders'></div>
                        {tweet.user_id === parseInt(userId) ?
                            <div key={`btn-${tweet.id}`} className="one-tweet-edit-btns">
                                <span>
                                    <EditTweetModal tweetId={tweet.id} />
                                </span>
                                <span>
                                    <DeleteTweetModal tweetId={tweet.id} />
                                </span>
                            </div>
                            : null}
                        {users.map(user => {
                            return <span key={`${tweet.id}-${user.id}`}>
                                {
                                    tweet.user_id === user.id ?
                                        <span>

                                            <div className='user-profile'>
                                                <img src={`${user.profile_img}`} alt='profile-img' className='user-profile-img' />
                                                <div className='user-info'>
                                                    <div className='user-fullname'>
                                                        {user.first_name} {user.last_name}
                                                    </div>
                                                    <div className='user-username'>
                                                        @{user.username}
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                        : null
                                }
                            </span>
                        })}
                        <NavLink key={`tweet-${tweet.id}`} exact to={`/${userId}/tweets/${tweet.id}`} style={{ textDecoration: 'none', color: 'black' }} >
                            <div className='container-tweet-contents'>
                                <li key={`tweet-${tweet.id}`} >
                                    <div>{tweet.content}</div>
                                </li>
                            </div>
                        </NavLink>
                    </div>
                })}
            </ul>
        </div>
    )
}

export default Tweets;

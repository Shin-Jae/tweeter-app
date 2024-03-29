import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Likes from '../Likes';
import TimeDisplay from '../TimeDisplay';
import DropdownModal from './DropdownModal';
import './Tweets.css'

function Tweets() {
    const { userId } = useParams();

    const allTweets = useSelector((state) => state.tweets);
    const allUsers = useSelector((state) => state.search);
    const users = Object.values(allUsers);

    const tweets = Object.values(allTweets).reverse();


    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {tweets.map(tweet => {
                    return <div key={tweet?.id} className='one-tweet-container'>
                        <div className='tweet-borders'></div>
                        {tweet?.user_id === parseInt(userId) ?
                            <div key={`btn-${tweet?.id}`} className="one-tweet-edit-btns">
                                <DropdownModal tweetId={tweet?.id} />
                            </div>
                            : null}
                        {users.map(user => {
                            return <span key={`${tweet?.id}-${user?.id}`}>
                                {tweet?.user_id === user?.id ?
                                    <span>
                                        <NavLink to={`/profile/${userId}/${user?.id}`} exact={true} className='user-profile' activeStyle={{ textDecoration: 'none' }} style={{ textDecoration: 'none', color: 'black' }} key={user.id}>
                                            <img src={`${user?.profile_img}`} alt='profile-img' className='user-profile-img' />
                                            <div className='user-info'>
                                                <div className='user-fullname'>
                                                    {user?.name}
                                                </div>
                                                <div className='user-username'>
                                                    @{user?.username}
                                                </div>
                                                {/* <div>
                                                    <TimeDisplay tweet={tweet} />
                                                </div> */}
                                            </div>
                                        </NavLink>
                                    </span>
                                    : null
                                }
                            </span>
                        })}
                        <NavLink key={`tweet-${tweet?.id}`} exact to={`/${userId}/tweets/${tweet?.id}`} style={{ textDecoration: 'none', color: 'black' }} >
                            <div className='container-tweet-contents' key={`tweet-${tweet?.id}`}>
                                <li  >
                                    <div className='tweet-content-container'>{tweet?.content}</div>
                                </li>
                                {tweet?.image &&
                                    <li>
                                        <div className='tweet-image-container'><img className='tweet-image' src={tweet?.image} alt='' /></div>
                                    </li>
                                }
                            </div>
                        </NavLink>
                        <div className='likes-container'>
                            <div>
                                <Likes count={tweet?.tweet_likes} tweetId={tweet?.id} />
                            </div>
                        </div>
                    </div>
                })}
            </ul>
        </div>
    )
}

export default Tweets;

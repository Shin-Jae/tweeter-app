import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getExploreTweets } from "../../store/tweet";
import './ExplorePage.css'

function ExplorePage() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const allTweets = useSelector((state) => state.tweets);
    const allUsers = useSelector((state) => state.search);
    const users = Object.values(allUsers);

    const tweets = Object.values(allTweets).reverse();

    useEffect(() => {
        dispatch(getExploreTweets(userId));

    }, [userId, dispatch]);

    return (
        <div className="explore-container">
            <div className="home-text explore-text">
                Explore
            </div>
            <div>
                <ul style={{ listStyleType: 'none' }}>
                    {tweets.map(tweet => {
                        return <div key={tweet.id} className='one-tweet-container'>
                            <div className='tweet-borders'></div>
                            {users.map(user => {
                                return <span key={`${tweet.id}-${user.id}`}>
                                    {tweet.user_id === user.id ?
                                        <span>
                                            <NavLink to={`/profile/${userId}/${user.id}`} exact={true} className='user-profile' activeStyle={{ textDecoration: 'none' }} style={{ textDecoration: 'none', color: 'black' }} key={user.id}>
                                                <img src={`${user.profile_img}`} alt='profile-img' className='user-profile-img' />
                                                <div className='user-info'>
                                                    <div className='user-fullname'>
                                                        {user.name}
                                                    </div>
                                                    <div className='user-username'>
                                                        @{user.username}
                                                    </div>
                                                </div>
                                            </NavLink>
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
        </div>
    )
}

export default ExplorePage;

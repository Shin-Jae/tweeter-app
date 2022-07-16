import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DropdownModal from "../Tweets/DropdownModal";




function UserTweets({ profileId }) {
    const userId = useSelector((state) => state.session.user.id)
    const allTweets = useSelector((state) => state.tweets);
    const tweets = Object.values(allTweets).reverse();
    const profile = useSelector((state) => state.search[profileId])

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {tweets.map(tweet => {
                    return <div key={tweet?.id} className='one-tweet-container'>
                        <div className='tweet-borders'></div>
                        <NavLink key={`tweet-${tweet.id}`} exact to={`/${userId}/tweets/${tweet.id}`} style={{ textDecoration: 'none', color: 'black' }} >
                            {userId === parseInt(profileId) &&
                                <div key={`btn-${tweet?.id}`} className="one-tweet-edit-btns">
                                    <DropdownModal tweetId={tweet?.id} />
                                </div>}
                            <span key={`${tweet?.id}-${profile?.id}`}>
                                <div className='user-profile'>
                                    <img src={`${profile?.profile_img}`} alt='profile-img' className='user-profile-img' />
                                    <div className='user-info'>
                                        <div className='user-fullname user-tweets-fullname'>
                                            {profile?.name}
                                        </div>
                                        <div className='user-username'>
                                            @{profile?.username}
                                        </div>
                                    </div>
                                </div>
                            </span>
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

export default UserTweets;

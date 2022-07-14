import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getUserTweets } from "../../store/tweet";
import Follow from "../Follow";
import "./ProfilePage.css"
import UserTweets from "./UserTweets";


function ProfilePage() {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const curUser = useSelector((state) => state.session.user.id)
    const follow = useSelector((state) => state.session.user.following)
    const allUsers = useSelector((state) => state.search);
    const followers = Object.values(allUsers)
    const users = useSelector((state) => state.search[profileId])

    let count = 0
    useEffect(() => {
        if (!profileId) {
            return history.push('/error')
        }
        dispatch(getUserTweets(profileId));
    }, [profileId, follow, followers, count]);

    followers.forEach(user => {
        if (user.id !== parseInt(profileId)) {
            user.following.forEach(follow => {
                if (follow.id === parseInt(profileId)) count += 1;
            })
        }
    })
    return (
        <div className="profile-page-container">
            <div className=" home-text">
                {users?.name}
            </div>
            <div className="profile-banner">
                <img src={`${users?.banner_img}`} alt='banner' className="profile-banner-img" />
            </div>
            <div>
                <img src={`${users?.profile_img}`} alt='profile-img' className='profile-page-user-img' />
            </div>
            {/* {curUser !== parseInt(profileId)
                ? <div className="profile-follow-btn">
                    <Follow followingId={profileId} />
                </div>
                : null
            } */}

            <div className="profile-page-info-container">
                <div className="full-name-profile-page">
                    {users?.name}
                </div>
                <div className="username-profile-page">
                    @{users?.username}
                </div>
                <div>
                    {users?.bio}
                </div>
                <div>
                    {users?.birthday}
                </div>
                <div className="follow-display">
                    <span className="following-count">
                        {users?.following.length}
                    </span>
                    <span className="following-text">
                        Following
                    </span>
                    <span>
                        <span className="follower-count">
                            {count}
                        </span>
                        <span className="followers-text">
                            Followers
                        </span>
                    </span>
                </div>
                <div className="profile-tweets-container">
                    <div className="profile-tweets-header">Tweets</div>
                    <div>
                        <UserTweets profileId={profileId} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfilePage;

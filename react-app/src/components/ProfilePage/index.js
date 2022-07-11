import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Follow from "../Follow";
import "./ProfilePage.css"


function ProfilePage() {
    const { profileId } = useParams();

    const follow = useSelector((state) => state.session.user.following)
    const allUsers = useSelector((state) => state.search);
    const followers = Object.values(allUsers)
    const users = useSelector((state) => state.search[profileId])

    const filter = followers.filter(user => user.id === parseInt(profileId))

    return (
        <div className="profile-page-container">
            <div className="fullname-header">
                {users?.first_name} {users?.last_name}
            </div>
            <div className="profile-banner">
                <img src={`${users?.banner_img}`} alt='banner' className="profile-banner-img" />
            </div>
            <div>
                <img src={`${users?.profile_img}`} alt='profile-img' className='profile-page-user-img' />
            </div>
            <div className="profile-follow-btn">
                <Follow followingId={profileId} />
            </div>
            <div className="profile-page-info-container">
                <div className="full-name-profile-page">
                    {users?.first_name} {users?.last_name}
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
                        {follow.length}
                    </span>
                    <span className="following-text">
                        Following
                    </span>
                    <span>
                        <span className="follower-count">
                            {filter.length}
                        </span>
                        <span className="followers-text">
                            Followers
                        </span>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default ProfilePage;

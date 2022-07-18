import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllFollows } from "../../store/follows";
import { getUserTweets } from "../../store/tweet";
import { getUserFollows } from "../../store/userfollows";
import FollowersModal from "./Followers";
import FollowingModal from "./Following";
import ProfileFollow from "./ProfileFollow";
import "./ProfilePage.css"
import UserTweets from "./UserTweets";


function ProfilePage() {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const curUser = useSelector((state) => state.session.user.id)
    const follow = useSelector((state) => state.useFollow)
    const allUsers = useSelector((state) => state.search);
    const followers = Object.values(allUsers)
    const users = useSelector((state) => state.search[profileId])
    let birthday;
    if (users?.birthday) {
        let dob = users.birthday
        dob = dob.split(' ')
        birthday = `Born ${dob[2]} ${dob[1]}, ${dob[3]}`
    }
    let joined;
    if (users?.created_at) {
        let join = users.created_at
        join = join.split(' ')
        joined = `Joined ${join[2]} ${join[3]}`
    }

    useEffect(() => {
        if (!profileId) {
            return history.push('/error')
        }
        (async () => {
            await dispatch(getUserTweets(profileId));
            await dispatch(getAllFollows(profileId));
            await dispatch(getUserFollows(curUser));
        })()
    }, [profileId, follow, followers]);

    return (
        <div className="profile-page-container">
            <div className=" home-text home-text-margin">
                {users?.name}
            </div>
            <div className="profile-banner">
                <img src={`${users?.banner_img}`} alt='banner' className="profile-banner-img" />
            </div>
            <div>
                <img src={`${users?.profile_img}`} alt='profile-img' className='profile-page-user-img' />
            </div>
            {curUser !== parseInt(profileId)
                ? <div className="profile-follow-btn">
                    <ProfileFollow followingId={parseInt(profileId)} />
                </div>
                : null
            }
            <div className="profile-page-info-container">
                <div className="full-name-profile-page">
                    {users?.name}
                </div>
                <div className="username-profile-page">
                    @{users?.username}
                </div>
                {users?.bio &&
                    <div className="user-bio">
                        {users?.bio}
                    </div>}
                <div className="date-profile">
                    {birthday &&
                        <div>
                            <i class="fa-solid fa-cake-candles fa-md birthday-icon"></i>
                            <span className="birthday-text">{birthday}</span>
                        </div>
                    }
                    {joined &&
                        <div>
                            <i class="fa-solid fa-calendar-days birthday-icon"></i>
                            <span className="birthday-text">{joined}</span>
                        </div>
                    }
                </div>
                <div className="follow-display">
                    <FollowingModal profileId={profileId} />
                    <FollowersModal profileId={profileId} />
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

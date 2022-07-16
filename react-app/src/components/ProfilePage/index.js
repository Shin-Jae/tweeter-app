import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getUserTweets } from "../../store/tweet";
import Follow from "../Follow";
import FollowersModal from "./Followers";
import FollowingModal from "./Following";
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
    // if (users.birthday) {
    //     let year = dob.getFullYear();
    //     let month = dob.getMonth();
    //     let date = dob.getDate();
    //     dob = `Born ${month} ${date}, ${year}`
    // }

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

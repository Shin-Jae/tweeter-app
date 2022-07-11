import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Follow from "../Follow";


function ProfilePage() {
    const { profileId } = useParams();

    const follow = useSelector((state) => state.session.user.following)
    const allUsers = useSelector((state) => state.search);
    const followers = Object.values(allUsers)
    const users = useSelector((state) => state.search[profileId])
    console.log('followers', followers)

    const filter = followers.filter(user => user.id === parseInt(profileId))
    console.log('follow', filter)

    return (
        <div>
            <div>
                <img src={`${users?.profile_img}`} alt='profile-img' className='user-profile-img' />
            </div>
            <div>
                <Follow followingId={profileId} />
            </div>
            <div>
                {users?.first_name} {users?.last_name}
            </div>
            <div>
                {users?.username}
            </div>
            <div>
                {users?.bio}
            </div>
            <div>
                {users?.birthday}
            </div>
            <div>
                <span>
                    {follow.length} Following
                </span>
                <span>
                    {filter.length} Followers
                </span>
            </div>
        </div >
    )
}

export default ProfilePage;

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function ProfilePage() {
    const { profileId } = useParams();

    const users = useSelector((state) => state.search[profileId])

    return (
        <div>
            <div>
                {users?.first_name} {users?.last_name}
            </div>
            <div>
                <img src={`${users?.profile_img}`} alt='profile-img' className='user-profile-img' />
            </div>
            <div>
                {users?.username}
            </div>
            <div>
                {users?.bio}
            </div>
        </div >
    )
}

export default ProfilePage;

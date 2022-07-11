import { useSelector } from "react-redux";
import Follow from "../Follow";
import './RightColumn.css';


function WhoToFollow() {
    const allUsers = useSelector((state) => state.search);
    const userId = useSelector((state) => state.session.user.id);
    const curUser = useSelector((state) => state.session.user.following);


    const following = []
    curUser.forEach(user => following.push(user.id))

    const users = Object.values(allUsers);


    return (
        <div className="who-to-follow-container">
            <div className="recommended-text">
                Who to follow
            </div>
            {users.map(user => {
                if (!following.includes(user.id) && user.id !== userId)
                    return <div key={user.id} className="user-recommended-container">
                        <span>
                            <img src={`${user.profile_img}`} alt='profile-img' className='user-profile-img' />
                        </span>
                        <div className="user-fullname-username">
                            <div className="recommended-fullname">
                                {user.first_name} {user.last_name}
                            </div>
                            <div className='recommended-username'>
                                @{user.username}
                            </div>
                        </div>
                        <div className="recommened-follow-btn">
                            <Follow followingId={user.id} />
                        </div>
                    </div>
            })}
        </div>
    )
}

export default WhoToFollow;

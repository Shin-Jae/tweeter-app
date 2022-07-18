import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Follow from "../Follow";
import './RightColumn.css';


function WhoToFollow() {

    const allUsers = useSelector((state) => state.search);
    const userId = useSelector((state) => state.session.user.id);
    const curUser = useSelector((state) => state.userFollow);
    const follows = Object.values(curUser);
    const following = follows.map(user => user.id)

    const usersArr = Object.values(allUsers);
    usersArr.sort(() => Math.random() - .5);
    const users = usersArr.filter(user => !following.includes(user.id) && user.id !== userId)


    return (
        <div className="who-to-follow-container">
            <div className="recommended-text">
                Who to follow
            </div>
            {users.slice(0, 3).map(user => {
                if (!following.includes(user.id) && user.id !== userId) {
                    return <div key={user.id} className="user-recommended-container">
                        <NavLink to={`/profile/${userId}/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <span>
                                <img src={`${user.profile_img}`} alt='profile-img' className='user-profile-img' />
                            </span>
                            <div className="user-fullname-username">
                                <div className="recommended-fullname">
                                    {user.name}
                                </div>
                                <div className='recommended-username'>
                                    @{user.username}
                                </div>
                            </div>
                        </NavLink>
                        <div className="recommened-follow-btn">
                            <Follow followingId={user.id} />
                        </div>
                    </div>
                }
            })}
        </div>
    )
}

export default WhoToFollow;

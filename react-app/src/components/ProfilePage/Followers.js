import { Modal } from "../../context/modal";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfilePage.css"
import Follow from "../Follow";

const FollowersModal = ({ profileId }) => {
    // const dispatch = useDispatch();
    const history = useHistory();

    const curUser = useSelector((state) => state.session.user.id)
    const follow = useSelector((state) => state.session.user.following)
    const allUsers = useSelector((state) => state.search);
    const followers = Object.values(allUsers)
    const users = useSelector((state) => state.search[profileId])

    let arr = []
    followers.forEach(user => {
        if (user.id !== parseInt(profileId)) {
            user.following.forEach(follow => {
                if (follow.id === parseInt(profileId)) arr.push(user)
            })
        }
    })

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="followers-container">
                <span onClick={() => {
                    setShowModal(true)
                }}
                    className="followers-modal-btn"
                >
                    <span className="follower-count">
                        {arr.length}
                    </span>
                    <span className="followers-text">
                        Followers
                    </span>
                </span>
                {arr && showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className="following-modal-container">
                            <div className="following-users-container">
                                <div className="following-header">
                                    Followers
                                </div>
                                {!arr.length && <div className="no-followers">No followers yet</div>}
                                <div>
                                    {arr.map(user => {
                                        return <div>
                                            <NavLink to={`/profile/${curUser}/${user.id}`} key={`${user.id}-search-link`} onClick={() => setShowModal(false)} activeStyle={{ textDecoration: 'none' }} style={{ textDecoration: 'none', color: 'black' }}>
                                                <div key={user.id} className="user-search-container following-user">
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
                                                        <div className='bio'>
                                                            {user.bio}
                                                        </div>
                                                    </div>
                                                    {curUser !== user.id &&
                                                        <div className="recommened-follow-btn">
                                                            <Follow followingId={user.id} />
                                                        </div>
                                                    }
                                                </div>
                                            </NavLink>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default FollowersModal;

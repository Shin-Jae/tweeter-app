import { Modal } from "../../context/modal";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfilePage.css"
import "./Follows.css";
import Follow from "../Follow";

const FollowingModal = ({ profileId }) => {
    // const dispatch = useDispatch();
    const history = useHistory();

    const curUser = useSelector((state) => state.session.user.id)

    const users = useSelector((state) => state.search[profileId])
    let following;
    if (users) {
        let follows = users.following
        following = Object.values(follows);
    }
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                {users &&
                    <span
                        onClick={() => {
                            setShowModal(true)
                        }}
                        className="followers-modal-btn"
                    >
                        <span className="following-count">
                            {users?.following.length}
                        </span>
                        <span className="following-text">
                            Following
                        </span>
                    </span>
                }
                {users && showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className="following-modal-container">
                            <div className="following-users-container">
                                <div className="following-header">Following</div>
                                {!following.length && <div className="no-followers">Not following anyone</div>}
                                {following.map(user => {
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
                                                <div className="recommened-follow-btn">
                                                    <Follow followingId={user.id} />
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                })}
                            </div>
                        </div>
                    </Modal>)}
            </div>
        </>
    )
}

export default FollowingModal;

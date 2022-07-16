import { Modal } from "../../context/modal";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfilePage.css"

const FollowersModal = ({ profileId }) => {
    // const dispatch = useDispatch();
    const history = useHistory();

    const curUser = useSelector((state) => state.session.user.id)
    const follow = useSelector((state) => state.session.user.following)
    const allUsers = useSelector((state) => state.search);
    const followers = Object.values(allUsers)
    const users = useSelector((state) => state.search[profileId])

    let count = 0

    followers.forEach(user => {
        if (user.id !== parseInt(profileId)) {
            user.following.forEach(follow => {
                if (follow.id === parseInt(profileId)) count += 1;
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
                        {count}
                    </span>
                    <span className="followers-text">
                        Followers
                    </span>
                </span>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div>
                            <div>
                                Followers
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default FollowersModal;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import '../Tweets/DropdownModal.css'

const LogoutPopUp = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.session.user);

    const handleOpen = () => {
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }

    return (
        <>
            {user ?
                <div className='side-bar-profile-logout' onClick={handleOpen}>
                    <img src={`${user?.profile_img}`} alt='profile-img' className='user-profile-img' />
                    <div className="user-fullname-username">
                        <div className="recommended-fullname">
                            {user?.name}
                        </div>
                        <div className='recommended-username'>
                            @{user?.username}
                        </div>
                    </div>
                    <div className="logout-container-dropdown">
                        <button
                            className='logout-dropdown'
                        >
                            <span>
                                <i className="fa-solid fa-ellipsis fa-lg"></i>
                            </span>
                        </button>
                    </div>
                </div>
                : null}
            {open && (
                <div>
                    <div className='logout-pop-up'>
                        <img src={`${user?.profile_img}`} alt='profile-img' className='user-profile-img' />
                        <div className="user-fullname-username">
                            <div className="recommended-fullname">
                                {user?.name}
                            </div>
                            <div className='recommended-username'>
                                @{user?.username}
                            </div>
                        </div>
                        <div className="logout-btn">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LogoutPopUp;

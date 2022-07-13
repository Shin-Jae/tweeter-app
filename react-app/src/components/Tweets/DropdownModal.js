import React, { useState } from "react";
import EditTweetModal from "../EditTweet";
import DeleteTweetModal from "../DeleteTweet";
import './DropdownModal.css';

const DropdownModal = ({ tweetId }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className='edit-delete-dropdown'
            >
                <span>
                    <i className="fa-solid fa-ellipsis fa-lg"></i>
                </span>
            </button>
            {open && (
                <div className='dropdown-container'>
                    <span >
                        <EditTweetModal tweetId={tweetId} />
                    </span>
                    <span>
                        <DeleteTweetModal tweetId={tweetId} />
                    </span>
                </div>
            )}
        </>
    )
}

export default DropdownModal

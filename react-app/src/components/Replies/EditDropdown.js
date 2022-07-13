import React, { useState } from "react";
import EditReplyModal from "../EditReply";
import DeleteReplyModal from "../DeleteReply";
import '../Tweets/DropdownModal.css'

const EditDropdown = ({ replyId }) => {
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
                        <EditReplyModal replyId={replyId} />
                    </span>
                    <span>
                        <DeleteReplyModal replyId={replyId} />
                    </span>
                </div>
            )}
        </>
    )
}

export default EditDropdown;

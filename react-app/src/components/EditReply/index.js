import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditReplyForm from "./EditReplyForm";

const EditReplyModal = ({ replyId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className='dropdown-btns'
                >
                    <i className="fa-regular fa-pen-to-square fa-lg dropdown-edit-text"></i> <span className="dropdown-edit-text edit-btn-text">Edit</span>
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditReplyForm onClose={() => setShowModal(false)} showModal={showModal} replyId={replyId} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default EditReplyModal

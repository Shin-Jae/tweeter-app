import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditTweetForm from "./EditTweetForm";

const EditTweetModal = ({ tweetId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className='dropdown-btns'
                >
                    <i className="fa-regular fa-pen-to-square fa-lg dropdown-edit-text"></i> <span className="dropdown-edit-text edit-btn-text">Edit</span>
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditTweetForm onClose={() => setShowModal(false)} showModal={showModal} editId={tweetId} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default EditTweetModal

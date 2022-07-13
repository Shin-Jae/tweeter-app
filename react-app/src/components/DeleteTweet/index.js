import { Modal } from "../../context/modal";
import React, { useState } from "react";
import DeleteTweet from "./DeleteTweet";

const DeleteTweetModal = ({ tweetId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className='dropdown-btns'
                >
                    <i className="fa-regular fa-trash-can fa-lg dropdown-delete-text"></i> <span className="dropdown-delete-text delete-btn-text">Delete</span>
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteTweet onClose={() => setShowModal(false)} deleteId={tweetId} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default DeleteTweetModal

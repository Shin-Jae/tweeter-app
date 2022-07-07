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
                >
                    <span>Delete</span>
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteTweet onClose={() => setShowModal(false)} tweetId={tweetId} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default DeleteTweetModal

import { Modal } from "../../context/modal";
import React, { useState } from "react";
import DeleteReply from "./DeleteReply";

const DeleteReplyModal = ({ replyId }) => {
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
                        <DeleteReply onClose={() => setShowModal(false)} replyId={replyId} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default DeleteReplyModal

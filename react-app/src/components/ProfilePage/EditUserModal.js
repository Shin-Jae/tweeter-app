import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditUser from "./EditUser";

const EditUserModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className='edit-user-btn'
                >
                    Edit profile
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditUser onClose={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default EditUserModal

import { Modal } from "../../context/modal";
import React, { useState } from "react";
import SignUpForm from "../auth/SignUpForm";

const SignUpModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className='signup-modal-btn'
                >
                    <span>Sign up with email</span>
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm onClose={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default SignUpModal

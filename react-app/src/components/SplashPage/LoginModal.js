import { Modal } from "../../context/modal";
import React, { useState } from "react";
import LoginForm from "../auth/LoginForm";

const LoginModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className='signin-modal-btn'
                >
                    <span>Sign in</span>
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm onClose={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default LoginModal

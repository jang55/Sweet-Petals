import React, { useState } from 'react';
import { Modal } from '../../context/modalContext';
import SignupFormPage from "../login-signup/SignupFormPage"

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);
    console.log(showModal)
    return (
        <>
        <div onClick={() => setShowModal(true)} style={{}}>Sign Up</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <SignupFormPage />
            </Modal>
        )}
        </>
    );
}
export default SignupFormModal;
import React, { useState } from 'react';
import { Modal } from '../../context/modalContext';
import SignupFormPage from "../login-signup/SignupFormPage"

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);
    console.log(showModal)
    return (
        <>
        <button  onClick={() => setShowModal(true)}>Sign Up</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <SignupFormPage />
            </Modal>
        )}
        </>
    );
}
export default SignupFormModal;
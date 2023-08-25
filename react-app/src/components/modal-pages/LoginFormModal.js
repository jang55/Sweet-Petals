import React, { useState } from 'react';
import { Modal } from '../../context/modalContext';
import LoginFormPage from '../login-signup/LoginFormPage';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <button  onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <LoginFormPage />
            </Modal>
        )}
        </>
    );
}
export default LoginFormModal;
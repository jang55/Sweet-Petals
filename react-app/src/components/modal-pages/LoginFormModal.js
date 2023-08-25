import React, { useState } from 'react';
import { Modal } from '../../context/modalContext';
import LoginFormPage from '../login-signup/LoginFormPage';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        {/* this style button is iin the login.css */}
        <button className='login-button-nav' onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <LoginFormPage />
            </Modal>
        )}
        </>
    );
}
export default LoginFormModal;
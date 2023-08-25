import React, { useState } from 'react';
import { Modal } from '../../context/modalContext';
import DeleteOrder from "./DeleteOrder"

function DeleteOrderModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <button  onClick={() => setShowModal(true)}>Delete</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <DeleteOrder />
            </Modal>
        )}
        </>
    );
}
export default DeleteOrderModal;
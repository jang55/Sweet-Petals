import React, { useState } from "react";
import { Modal } from "../../context/modalContext";
import DeleteOrderTwo from "../orders/DeleteOrderTwo";

function DeleteOrderModalTwo({ order, dessertType }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <span className={`${dessertType === "cookie" ? "edit-cookie-remove" : "edit-remove"}`} onClick={e => setShowModal(true)}>
            remove
        </span>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <DeleteOrderTwo order={order} setShowModal={setShowModal} />
            </Modal>
        )}
        </>
    );
}
export default DeleteOrderModalTwo;

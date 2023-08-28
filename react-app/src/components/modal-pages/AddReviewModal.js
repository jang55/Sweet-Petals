import React, { useState } from "react";
import { Modal } from "../../context/modalContext";
import CreateReview from "../reviews/CreateReview";

function AddReviewModal({ order }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <button className="order-buttons" onClick={() => setShowModal(true)}>
            Add Review
        </button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <CreateReview order={order} setShowModal={setShowModal}/>
            </Modal>
        )}
        </>
    );
}
export default AddReviewModal;

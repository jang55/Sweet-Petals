import React, { useState } from "react";
import { Modal } from "../../context/modalContext";
import DeleteReview from "../reviews/DeleteReview";

function DeleteReviewModal({ review, setShowEditForm }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <span
        className="user-review-delete-review-text"
        onClick={() => {
          setShowModal(true);
          setShowEditForm("");
        }}
      >
        Delete
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReview review={review} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
export default DeleteReviewModal;

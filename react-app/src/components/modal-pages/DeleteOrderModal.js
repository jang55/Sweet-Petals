import React, { useState } from "react";
import { Modal } from "../../context/modalContext";
import DeleteOrder from "./DeleteOrder";

function DeleteOrderModal({ order }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="order-buttons" onClick={() => setShowModal(true)}>
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteOrder order={order} />
        </Modal>
      )}
    </>
  );
}
export default DeleteOrderModal;

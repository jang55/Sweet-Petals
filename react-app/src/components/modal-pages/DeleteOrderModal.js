import React, { useState } from "react";
import { Modal } from "../../context/modalContext";
import DeleteOrder from "../orders/DeleteOrder";

function DeleteOrderModal({ order }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="order-buttons" onClick={() => setShowModal(true)}>
        Cancel
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteOrder order={order} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
export default DeleteOrderModal;

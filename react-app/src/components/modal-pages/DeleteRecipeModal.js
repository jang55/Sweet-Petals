import React, { useState } from "react";
import { Modal } from "../../context/modalContext";
import DeleteRecipe from "../recipes/DeleteRecipe";

function DeleteRecipeModal({ recipe }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <p className="recipe-card-delete" onClick={e => setShowModal(true)}>Delete</p>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <DeleteRecipe recipe={recipe} setShowModal={setShowModal} />
            </Modal>
        )}
        </>
    );
}
export default DeleteRecipeModal;

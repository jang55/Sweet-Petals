import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./css/edit-cheesecake.css";
import { deleteCheesecakesOrderThunk, updateCheesecakesOrderThunk } from "../../../store/orderReducer";



function EditCheesecake({
  cheesecake,
  hoverShowEdit,
  setHoverShowEdit,
  showEditForm,
  setShowEditForm,
}) {


  const [strawberries, setStrawberries] = useState(cheesecake.strawberries);
  const [cheesecakeFlavor, setCheesecakeFlavor] = useState(
    cheesecake.flavor
  );
  const [amount, setAmount] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoaded(true);
  }, [cheesecake]);

  const handleEditCheesecake = (e) => {
    e.preventDefault();
    dispatch(updateCheesecakesOrderThunk(cheesecake.order_id, cheesecake.id, cheesecakeFlavor, strawberries, amount));
    setShowEditForm("");
  };



  // handles removing items in cart with one click
  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(deleteCheesecakesOrderThunk(cheesecake.order_id, cheesecake.id))
    return;
  };

  return isLoaded && showEditForm === `${cheesecake.id}cheesecake` ? (
    <div className="edit-cheesecake-wrapper-in-edit-form">
      <p className="edit-cheesecake-flavor">
        Flavor:{" "}
        <select
          className="edit-cheesecake-select-field"
          value={cheesecakeFlavor}
          onChange={(e) => setCheesecakeFlavor(e.target.value)}
          required
        >
          <option disabled value="">
            Select one...
          </option>
          <option value="Original">Original</option>
          <option value="Matcha">Matcha</option>
          <option value="Pumpkin">Pumpkin</option>
          <option value="Brown Sugar and Chocolate Swirl">
            Brown Sugar and Chocolate Swirl
          </option>
          <option value="Double Chocolate Almond">
            Double Chocolate Almond
          </option>
          <option value="Butter Pecan">Butter Pecan</option>
          <option value="Peanut Butter Cup">Peanut Butter Cup</option>
        </select>
      </p>
      <p className="edit-cheesecake-strawberries">
        Strawberries:{" "}
        <select
          className="edit-cheesecake-select-field-yes-no"
          value={strawberries}
          onChange={(e) => setStrawberries(e.target.value)}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </p>
      <div className="edit-items-handler">
        <button
          onClick={(e) => setAmount((prevAmount) => prevAmount - 1)}
          disabled={amount === 1}
          style={{
            height: "30px",
            width: "30%",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          -
        </button>
        <input
          className="edit-amount-input"
          disabled={true}
          value={amount <= 10 ? amount : 10}
          type="text"
        ></input>
        <button
          onClick={(e) => setAmount((prevAmount) => prevAmount + 1)}
          disabled={amount === 10}
          style={{
            height: "30px",
            width: "30%",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
      {cheesecake.strawberries ? (
        <span className="edit-cupcake-price">
          Price: <span className="cart-dollar-sign">$</span>
          {cheesecake.amount * 20}.00
        </span>
      ) : (
        <span className="edit-cupcake-price">
          Price: <span className="cart-dollar-sign">$</span>
          {cheesecake.amount * 18}.00
        </span>
      )}
      <span
        className="edit-remove"
        onClick={handleRemove}
      >
        remove
      </span>
      <span className="edit-cancel" onClick={e => setShowEditForm("")}>Cancel</span>
      <button className="edit-cupcake-text-save" onClick={handleEditCheesecake}>
        Save Changes
      </button>
    </div>
  ) : (
    <div
      className="edit-cheesecake-wrapper"
      onMouseEnter={(e) => setHoverShowEdit(`${cheesecake.id}cheesecake`)}
      onMouseLeave={(e) => setHoverShowEdit("")}
    >
      <p className="edit-cheesecake-flavor">Flavor: <span className="edit-flavor-text">{cheesecake.flavor}</span></p>
      <p className="edit-cheesecake-strawberries">
        Strawberries: <span className="edit-strawberries-text">{cheesecake.strawberries ? "Yes" : "No"}</span>
      </p>
      {cheesecake.strawberries ? (
        <span className="edit-cupcake-price">
          Price: <span className="cart-dollar-sign">$</span>
          {cheesecake.amount * 20}.00
        </span>
      ) : (
        <span className="edit-cupcake-price">
          Price: <span className="cart-dollar-sign">$</span>
          {cheesecake.amount * 18}.00
        </span>
      )}
      <span className="edit-cupcake-amount">
        Amount: <span className="edit-amount-text">{cheesecake.amount}</span>
      </span>

      {hoverShowEdit === `${cheesecake.id}cheesecake` && (
        <span
          className="edit-cupcake-text"
          onClick={(e) => setShowEditForm(`${cheesecake.id}cheesecake`)}
        >
          EDIT
        </span>
      )}
    </div>
  );
}

export default EditCheesecake;

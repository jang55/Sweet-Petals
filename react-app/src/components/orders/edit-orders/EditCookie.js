import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./css/edit-cookie.css"


function EditCookie({
  cookie,
  hoverShowEdit,
  setHoverShowEdit,
  showEditForm,
  setShowEditForm,
}) {
  const [selectedCookie, setSelectedCookie] = useState(cookie.flavor);
  const [amount, setAmount] = useState(cookie.amount);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaded(true);
  }, [cookie]);


  // handles the editing of a cookie order 
  const handleCookieEdit = (e) => {
    e.preventDefault();
    return;
  }



  // handles removing items in cart with one click
  const handleRemove = (e) => {
    e.preventDefault();

    // if (dessert.type === "cupcake") {
    //   dispatch(removeCupcakeAction(dessert));
    // } else if (dessert.type === "cookie") {
    //   dispatch(removecookieAction(dessert));
    // } else if (dessert.type === "cookie") {
    //   dispatch(removeCookieAction(dessert));
    // }
    return;
  };

  return isLoaded && showEditForm === `${cookie.id}cookie` ? (
    <div className="edit-cookie-wrapper-in-edit-form">
      <p className="edit-cookie-flavor">
        Flavor: {" "}
        <select
          className="edit-cookie-select-field"
          onChange={(e) => setSelectedCookie(e.target.value)}
          id="cookie-selection"
          value={selectedCookie}
          required
        >
          <option disabled value="">
            Select one...
          </option>
          <option value="Chocolate Chip">Chocolate Chip</option>
          <option value="Peanut Butter">Peanut Butter</option>
          <option value="Snickerdoodle">Snickerdoodle</option>
          <option value="Ube Crinkle">Ube Crinkle</option>
          <option value="Chocolate Crinkle">Chocolate Crinkle</option>
          <option value="Sugar Cookies">Sugar Cookies</option>
          <option value="White Chocolate Macadamia">
            White Chocolate Macadamia
          </option>
          <option value="Chewy M&M Cookies">Chewy M&M Cookies</option>
        </select>
      </p>
      <div className="edit-items-cookie-handler">
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
      <span className="edit-cookie-price">
        <span className="cart-dollar-sign">$</span>
        {cookie.amount * 10}.00
      </span>
      <span className="edit-cookie-remove" onClick={(e) => handleRemove(e, cookie)}>
        remove
      </span>
      <button className="edit-cookie-text-save" onClick={handleCookieEdit}>
        Save Changes
      </button>
    </div>
  ) : (
    
    
    
    
    
    <div
      className="edit-cookie-wrapper"
      onMouseEnter={(e) => setHoverShowEdit(`${cookie.id}cookie`)}
      onMouseLeave={(e) => setHoverShowEdit("")}
    >
      <p className="edit-cookie-flavor">Flavor: <span className="edit-flavor-text">{cookie.flavor}</span></p>
      <span className="edit-cookie-price">
        <span className="cart-dollar-sign">$</span>
        {cookie.amount * 10}.00
      </span>
      <span className="edit-cookie-amount">
        Amount: <span className="edit-amount-text">{cookie.amount}</span>
      </span>
      {hoverShowEdit === `${cookie.id}cookie` && (
        <span
          className="edit-cookie-text"
          onClick={(e) => setShowEditForm(`${cookie.id}cookie`)}
        >
          EDIT
        </span>
      )}
    </div>
  );
}

export default EditCookie;

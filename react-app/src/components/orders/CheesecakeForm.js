import "./css/cheesecake-form.css";
import { useState, useContext } from "react";
import { addCheesecakeAction } from "../../store/cartReducer";
import { useDispatch } from "react-redux";
import { InfoContext } from "../../context/InfoContext";

function CheesecakeForm() {
  const [strawberries, setStrawberries] = useState(false);
  const [cheesecakeFlavor, setCheesecakeFlavor] = useState("")
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const { setCartCount } = useContext(InfoContext);


  const handleSubmit = (e) => {
    e.preventDefault();

    // setCartCount(prevCount => prevCount + amount)

    const formRes = {
      id: cheesecakeFlavor+String(strawberries),
      flavor: cheesecakeFlavor,
      strawberries: strawberries,
      amount: amount,
      type: "cheesecake"
    }

    dispatch(addCheesecakeAction(formRes));
    return;
  }

  return (
    <div className="cheesecake-container">
      <div className="cheesecake-container-2">
        <div className="cheesecake-container-3">
          <div className="cheesecake-container-4">
            <div className="cheesecake-container-5">
              <div className="cheesecake-container-6">
                  <form onSubmit={handleSubmit}>
                    <h1 className="cheesecake-h1">Choose a Cheesecake flavor!</h1>
                    <p >Each order is a dozen of cheesecake bites!</p>
                    <label>
                      <p className="cheesecake-input-label">
                        flavor <span>*</span>
                      </p>
                      <select
                        className="cheesecake-input-field"
                        defaultValue={""}
                        required
                        onChange={(e) =>setCheesecakeFlavor(e.target.value)}
                      >
                        <option disabled value="">Select one...</option>
                        <option value="Original">Original</option>
                        <option value="Matcha">Matcha</option>
                        <option value="Pumpkin">Pumpkin</option>
                        <option value="Brown Sugar and Chocolate Swirl">Brown Sugar and Chocolate Swirl</option>
                        <option value="Double Chocolate Almond">Double Chocolate Almond</option>
                        <option value="Butter Pecan">Butter Pecan</option>
                        <option value="Peanut Butter Cup">Peanut Butter Cup</option>
                      </select>
                    </label>
                    <div className="cheese-straw-input-wrap">
                      <label>
                        <p className="cheesecake-input-label">Strawberries?</p>
                      </label>
                      <select
                        className="cheesecake-select-field"
                        value={strawberries}
                        onChange={(e) => setStrawberries(e.target.value)}
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </select>
                    </div>
                    <button className="cheesecake-submit-button" type="submit">
                      Add to cart
                    </button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheesecakeForm;


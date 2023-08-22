import "./css/cheesecake-form.css";
import { useState } from "react";
import { addCheesecakeAction } from "../../store/cartReducer";
import { useDispatch } from "react-redux";

function CheesecakeForm() {
  const [strawberries, setStrawberries] = useState(false);
  const [cheesecakeFlavor, setCheesecakeFlavor] = useState("")
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    const formRes = {
      id: cheesecakeFlavor+String(strawberries),
      flavor: cheesecakeFlavor,
      strawberries: strawberries,
      amount: amount,
    }
    console.log(formRes)
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
                        <option value="original">Original</option>
                        <option value="matcha">Matcha</option>
                        <option value="pumpkin">Pumpkin</option>
                        <option value="brown sugar and chocolate swirl">Brown Sugar and Chocolate Swirl</option>
                        <option value="double chocolate almond">Double Chocolate Almond</option>
                        <option value="butter pecan">Butter Pecan</option>
                        <option value="peanut butter cup">Peanut Butter Cup</option>
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


import "./css/cheesecake-form.css";
import { useState } from "react";

function CheesecakeForm() {
  const [strawberries, setStrawberries] = useState(false);
  const [cheesecakeFlavor, setCheesecakeFlavor] = useState("")

  return (
    <div className="cheesecake-container">
      <div className="cheesecake-container-2">
        <div className="cheesecake-container-3">
          <div className="cheesecake-container-4">
            <div className="cheesecake-container-5">
              <div className="cheesecake-container-6">
                  <form>
                    <h1>Choose a Cheesecake flavor!</h1>
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
                        <option disabled value="">Select a flavor...</option>
                        <option value="orinal">Original</option>
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

import "./css/cheesecake-form.css";
import { useState } from "react";

function CheesecakeForm() {
  const [strawberries, setStrawberries] = useState(false);

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
                      <input
                        className="cheesecake-input-field"
                        required
                      ></input>
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

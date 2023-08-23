import "./css/cookie-form.css";
import { useState } from "react";
import { addCookieAction, subtractCookieAction } from "../../store/cartReducer";
import { useDispatch } from "react-redux";

function CookieForm() {
  const [selectedCookie, setSelectedCookie] = useState("");
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formRes = {
      flavor: selectedCookie,
      amount: amount,
      type: "cookie"
    }
    console.log(formRes)
    dispatch(addCookieAction(formRes));
    return;
  }

  return (
    <div className="cookie-container">
      <div className="cookie-container-2">
        <div className="cookie-container-3">
          <div className="cookie-container-4">
            <div className="cookie-container-5">
              <div className="cookie-container-6">
                  <form onSubmit={handleSubmit}>
                    <h1 className="cookie-h1">Choose a Cookie flavor!</h1>
                    <label htmlFor="cookie-selection">
                      <p className="cookie-input-label">
                        flavor <span>*</span>
                      </p>
                      <select
                        className="cookie-input-field"
                        value={selectedCookie}
                        onChange={(e) => setSelectedCookie(e.target.value)}
                        id="cookie-selection"
                        defaultValue=""
                        required
                      >
                        <option disabled value="">
                          Select one...
                        </option>
                        <option value="Chocolate Chip">
                          Chocolate Chip (12)
                        </option>
                        <option value="Peanut Butter">Peanut Butter (12)</option>
                        <option value="Snickerdoodle">Snickerdoodle (12)</option>
                        <option value="Ube Crinkle">Ube Crinkle (12)</option>
                        <option value="Chocolate Crinkle">
                          Chocolate Crinkle (12)
                        </option>
                        <option value="Sugar Cookies">Sugar Cookies (12)</option>
                        <option value="White Chocolate Macadamia">
                          White Chocolate Macadamia (12)
                        </option>
                        <option value="Chewy M&M Cookies">
                          Chewy M&M Cookies (12)
                        </option>
                      </select>
                    </label>
                    <button className="cookie-submit-button" type="submit">
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

export default CookieForm;

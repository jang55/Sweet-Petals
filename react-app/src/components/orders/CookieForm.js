import "./css/cookie-form.css";
import { useState } from "react";

function CookieForm() {
  const [selectedCookie, setSelectedCookie] = useState("");


  return (
    <div className="cookie-container">
      <div className="cookie-container-2">
        <div className="cookie-container-3">
          <div className="cookie-container-4">
            <div className="cookie-container-5">
              <div className="cookie-container-6">
                  <form>
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
                        <option value="chocolate chip">
                          Chocolate Chip (6)
                        </option>
                        <option value="peanut butter">Peanut Butter (6)</option>
                        <option value="snickerdoodle">Snickerdoodle (6)</option>
                        <option value="ube crinkle">Ube Crinkle (6)</option>
                        <option value="chocolate crinkle">
                          Chocolate Crinkle (6)
                        </option>
                        <option value="sugar cookies">Sugar Cookies (6)</option>
                        <option value="white chocolate macadamia">
                          White Chocolate Macadamia (6)
                        </option>
                        <option value="chewy M&M cookies">
                          Chewy M&M Cookies (6)
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

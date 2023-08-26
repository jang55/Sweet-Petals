import "./css/cookie-form.css";
import { useState, useContext, useEffect } from "react";
import { addCookieAction } from "../../store/cartReducer";
import { useDispatch } from "react-redux";
import { InfoContext } from "../../context/InfoContext";
import { useSelector } from "react-redux";

function CookieForm() {
  const [selectedCookie, setSelectedCookie] = useState("");
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const { setCartCount } = useContext(InfoContext);
  const cart = useSelector((state) => state.cartState);
  const [cookies, setCookies] = useState({});

  useEffect(() => {
    if (cart && cart.cookies) {
      setCookies(cart.cookies);
    }
  }, [cart]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cookies[selectedCookie]) {
      setCartCount(prevCount => prevCount + amount);
    } else if(cookies[selectedCookie] && cookies[selectedCookie].amount < 10) {
      setCartCount(prevCount => prevCount + amount);
    } 
    

    const formRes = {
      flavor: selectedCookie,
      amount: amount,
      type: "cookie"
    }
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
                    <p >Each order is a dozen of cookies!</p>
                    <label htmlFor="cookie-selection">
                      <p className="cookie-input-label">
                        flavor <span>*</span>
                      </p>
                      <select
                        className="cookie-input-field"
                        onChange={(e) => setSelectedCookie(e.target.value)}
                        id="cookie-selection"
                        defaultValue=""
                        required
                      >
                        <option disabled value="">
                          Select one...
                        </option>
                        <option value="Chocolate Chip">
                          Chocolate Chip
                        </option>
                        <option value="Peanut Butter">Peanut Butter</option>
                        <option value="Snickerdoodle">Snickerdoodle</option>
                        <option value="Ube Crinkle">Ube Crinkle</option>
                        <option value="Chocolate Crinkle">
                          Chocolate Crinkle
                        </option>
                        <option value="Sugar Cookies">Sugar Cookies</option>
                        <option value="White Chocolate Macadamia">
                          White Chocolate Macadamia
                        </option>
                        <option value="Chewy M&M Cookies">
                          Chewy M&M Cookies
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

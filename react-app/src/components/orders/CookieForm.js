import "./css/cookie-form.css"
import { useState } from "react";


function CookieForm() {
    const [selectedCookie, setSelectedCookie] = useState("")

    console.log(selectedCookie)

    return (
        <div className="cookie-form-container">
            <form>
                <h1>Choose a Cookie!</h1>
                <label htmlFor="cookie-selection">
                    <p className="cookie-input-label">
                        flavor <span>*</span>
                    </p>
                    <select 
                    className="cookie-input-field"
                    value={selectedCookie}
                    onChange={e => setSelectedCookie(e.target.value)}
                    id="cookie-selection"
                    defaultValue=""
                    >
                        <option disabled value="">Select a Cookie...</option>
                        <option value="chocolate chip">Chocolate Chip (6)</option>
                        <option value="peanut butter">Peanut Butter (6)</option>
                        <option value="snickerdoodle">Snickerdoodle (6)</option>
                        <option value="ube crinkle">Ube Crinkle (6)</option>
                        <option value="chocolate crinkle">Chocolate Crinkle (6)</option>
                        <option value="sugar cookies">Sugar Cookies (6)</option>
                        <option value="white chocolate macadamia">White Chocolate Macadamia (6)</option>
                        <option value="chewy M&M cookies">Chewy M&M Cookies (6)</option>
                    </select>
                </label>
                <button type="submit">Add to cart</button>
            </form>
        </div>
    )
}


export default CookieForm
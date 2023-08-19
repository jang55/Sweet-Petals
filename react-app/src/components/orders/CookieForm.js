import "./css/cookie-form.css"


function CookieForm() {

    return (
        <div className="cookie-form-container">
            <form>
                <h1>Choose a Cookie!</h1>
                <label >
                    <p className="cookie-input-label">
                        flavor <span>*</span>
                    </p>
                    <input
                    className="cookie-input-field"
                    ></input>
                </label>
            </form>
        </div>
    )
}


export default CookieForm
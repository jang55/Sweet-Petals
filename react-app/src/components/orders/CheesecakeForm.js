import "./css/cheesecake-form.css"


function CheesecakeForm() {

    return (
        <div className="cheesecake-form-container">
            <form>
                <h1>Choose a Cheesecake!</h1>
                <label >
                    <p className="cheesecake-input-label">
                        flavor <span>*</span>
                    </p>
                    <input
                    className="cheesecake-input-field"
                    required
                    ></input>
                </label>
                <label >
                    <p className="cheesecake-input-label">
                        Strawberries? 
                    </p>
                    <input
                    className="cheesecake-input-field"
                    ></input>
                </label>
            </form>
        </div>
    )
}


export default CheesecakeForm
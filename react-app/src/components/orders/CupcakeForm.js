import "./css/cupcake-form.css"


function CupcakeForm() {

    return (
        <div className="cupcake-form-container">
            <form>
                <h1>Create a Cupcake!</h1>
                <label >
                    <p className="form-input-label">
                        Color One <span>*</span>
                    </p>
                    <input required>
                    </input>
                </label>
                <label >
                    <p className="form-input-label">
                        Color Two 
                    </p>
                    <input></input>
                </label>
                <label >
                    <p className="form-input-label">
                        Color Three
                    </p>
                    <input></input>
                </label>
                <label >
                    <p className="form-input-label">
                        style <span>*</span>
                    </p>
                    <input></input>
                </label>
                <label >
                    <p className="form-input-label">
                        flavor <span>*</span>
                    </p>
                    <input></input>
                </label>
            </form>
        </div>
    )
}


export default CupcakeForm
import "./css/cupcake-form.css"


function CupcakeForm() {

    return (
        <div className="cupcake-form-container">
            <form>
                <h1>Create a Cupcake!</h1>
                <label >
                    <p className="cupcake-input-label">
                        Color One <span>*</span>
                    </p>
                    <input 
                    required
                    className="cupcake-input-field"
                    >
                    </input>
                </label>
                <label >
                    <p className="cupcake-input-label">
                        Color Two 
                    </p>
                    <input
                    className="cupcake-input-field"
                    ></input>
                </label>
                <label >
                    <p className="cupcake-input-label">
                        Color Three
                    </p>
                    <input
                    className="cupcake-input-field"
                    ></input>
                </label>
                <label >
                    <p className="cupcake-input-label">
                        style <span>*</span>
                    </p>
                    <input
                    required
                    className="cupcake-input-field"
                    ></input>
                </label>
                <label >
                    <p className="cupcake-input-label">
                        flavor <span>*</span>
                    </p>
                    <input
                    required
                    className="cupcake-input-field"
                    ></input>
                </label>
            </form>
        </div>
    )
}


export default CupcakeForm
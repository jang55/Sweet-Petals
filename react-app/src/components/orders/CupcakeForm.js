import "./css/cupcake-form.css";

function CupcakeForm() {

    
  return (
    <div className="cupcake-container">
      <div className="cupcake-container-2">
        <div className="cupcake-container-3">
          <div className="cupcake-container-4">
            <div className="cupcake-container-5">
              <div className="cupcake-container-6">
                <form>
                  <h1>Create a Cupcake!</h1>
                  <label>
                    <p className="cupcake-input-label">
                      Color One <span>*</span>
                    </p>
                    <input required className="cupcake-input-field"></input>
                  </label>
                  <label>
                    <p className="cupcake-input-label">Color Two</p>
                    <input className="cupcake-input-field"></input>
                  </label>
                  <label>
                    <p className="cupcake-input-label">Color Three</p>
                    <input className="cupcake-input-field"></input>
                  </label>
                  <label>
                    <p className="cupcake-input-label">
                      style <span>*</span>
                    </p>
                    <input required className="cupcake-input-field"></input>
                  </label>
                  <label>
                    <p className="cupcake-input-label">
                      flavor <span>*</span>
                    </p>
                    <input required className="cupcake-input-field"></input>
                  </label>
                  <button className="cupcake-submit-button" type="submit">
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

export default CupcakeForm;

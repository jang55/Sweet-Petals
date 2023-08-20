import "./css/cupcake-form.css";
import { useState, Fragment } from "react";
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';

function CupcakeForm() {
  const [flavor, setFlavor] = useState("")
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
    
  console.log(hsva)

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
                    <input value={hsvaToHex(hsva)} required className="cupcake-input-field"></input>
                    {/* <Fragment>
      <Wheel className="color-wheel-one" color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} />
      <div style={{ width: '100%', height: 34, background: hsvaToHex(hsva) }}></div>
    </Fragment> */}
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
                    <select
                        className="cupcake-select-field"
                        defaultValue={""}
                        onChange={(e) => setFlavor(e.target.value)}
                        required
                      >
                        <option disabled value="">Select one...</option>
                        <option value="semi floral">Semi Floral</option>
                        <option value="floral">Floral</option>
                        <option value="swirl">Swirl</option>
                        <option value="cactus">Cactus</option>
                      </select>
                  </label>
                  <label>
                    <p className="cupcake-input-label">
                      flavor <span>*</span>
                    </p>
                    <select
                        className="cupcake-select-field"
                        defaultValue={""}
                        onChange={(e) => setFlavor(e.target.value)}
                        required
                      >
                        <option disabled value="">Select one...</option>
                        <option value="vanilla">Vanilla</option>
                        <option value="chocolate">Chocolate</option>
                        <option value="lemon">Lemon</option>
                      </select>
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

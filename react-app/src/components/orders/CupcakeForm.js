import "./css/cupcake-form.css";
import { useState, Fragment, useEffect } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";

function CupcakeForm() {
  const [flavor, setFlavor] = useState("");
  const [hsvaOne, setHsvaOne] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [hsvaTwo, setHsvaTwo] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [hsvaThree, setHsvaThree] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [openWheel, setOpenWheel] = useState("");
  const [addColorTwo, setAddColorTwo] = useState(false);
  const [addColorThree, setAddColorThree] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      const colorWheel = document.getElementsByClassName("wheel-active")[0];
      if (event.target != colorWheel && event.target.parentNode != colorWheel) {
        if (colorWheel && colorWheel.style) {
          setOpenWheel("");
        }
      }
    });
  }, []);

  // console.log(hsvaOne);

  return (
    <div className="cupcake-container">
      <div className="cupcake-container-2">
        <div className="cupcake-container-3">
          <div className="cupcake-container-4">
            <div className="cupcake-container-5">
              <div className="cupcake-container-6">
                <form>
                  <h1 className="cupcake-h1">Create a Cupcake!</h1>
                  <p>Choose atleast one color for the frosting</p>
                  {/* Color one wheel */}
                  <label className="cupcake-color-one">
                    <p className="cupcake-input-label">
                      Color One <span className="required">*</span>
                    </p>
                    {/* <input value={hsvaToHex(hsva)} required className="cupcake-input-field"></input> */}
                    <Fragment>
                      <div
                        style={{
                          width: "50%",
                          height: 34,
                          background: hsvaToHex(hsvaOne),
                          cursor: "pointer",
                        }}
                        onClick={(e) => setOpenWheel("wheel-one")}
                      ></div>
                      <Wheel
                        className={`color-wheel-one ${
                          openWheel === "wheel-one"
                            ? "wheel-active"
                            : "wheel-not-active"
                        }`}
                        color={hsvaOne}
                        onChange={(color) =>
                          setHsvaOne({ ...hsvaOne, ...color.hsva })
                        }
                        // onPointerLeave={e => setOpenWheel("")}
                      />
                    </Fragment>
                  </label>
                  {/* color two wheel */}
                  {addColorTwo ? (
                    <label className="cupcake-color-two">
                      <p className="cupcake-input-label">Color Two</p>
                      {/* <input className="cupcake-input-field"></input> */}
                      <Fragment>
                        <div
                          style={{
                            width: "50%",
                            height: 34,
                            background: hsvaToHex(hsvaTwo),
                            cursor: "pointer",
                          }}
                          onClick={(e) => setOpenWheel("wheel-two")}
                        ></div>
                        <Wheel
                          className={`color-wheel-two ${
                            openWheel === "wheel-two"
                              ? "wheel-active"
                              : "wheel-not-active"
                          }`}
                          color={hsvaTwo}
                          onChange={(color) =>
                            setHsvaTwo({ ...hsvaTwo, ...color.hsva })
                          }
                        />
                      </Fragment>
                      {!addColorThree && <span className="remove" onClick={e => setAddColorTwo(false)}>remove</span>}
                    </label>
                  ) : (
                    <div
                      className="add-color"
                      onClick={(e) => setAddColorTwo(true)}
                    >
                      Add another color
                    </div>
                  )}
                  {/* Color three wheel */}
                  {addColorThree ? (
                    <label className="cupcake-color-three">
                      <p className="cupcake-input-label">Color Three</p>
                      {/* <input className="cupcake-input-field"></input> */}
                      <Fragment>
                        <div
                          style={{
                            width: "50%",
                            height: 34,
                            background: hsvaToHex(hsvaThree),
                            cursor: "pointer",
                          }}
                          onClick={(e) => setOpenWheel("wheel-three")}
                        ></div>
                        <Wheel
                          className={`color-wheel-three ${
                            openWheel === "wheel-three"
                              ? "wheel-active"
                              : "wheel-not-active"
                          }`}
                          color={hsvaThree}
                          onChange={(color) =>
                            setHsvaThree({ ...hsvaThree, ...color.hsva })
                          }
                        />
                      </Fragment>
                      <span className="remove" onClick={e => setAddColorThree(false)}>remove</span>
                    </label>
                  ) : (addColorTwo &&
                    <div
                      className="add-color"
                      onClick={(e) => setAddColorThree(true)}
                    >
                      Add another color
                    </div>
                  )}

                  <label>
                    <p className="cupcake-input-label">
                      style <span className="required">*</span>
                    </p>
                    <select
                      className="cupcake-select-field"
                      defaultValue={""}
                      onChange={(e) => setFlavor(e.target.value)}
                      required
                    >
                      <option disabled value="">
                        Select one...
                      </option>
                      <option value="semi floral">Semi Floral</option>
                      <option value="floral">Floral</option>
                      <option value="swirl">Swirl</option>
                      <option value="cactus">Cactus</option>
                    </select>
                  </label>
                  <label>
                    <p className="cupcake-input-label">
                      flavor <span className="required">*</span>
                    </p>
                    <select
                      className="cupcake-select-field"
                      defaultValue={""}
                      onChange={(e) => setFlavor(e.target.value)}
                      required
                    >
                      <option disabled value="">
                        Select one...
                      </option>
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

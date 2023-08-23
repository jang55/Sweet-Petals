import "./css/cupcake-form.css";
import { useState, Fragment, useEffect } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import { useDispatch } from "react-redux";
import { addCupcakeAction, subtractCupcakeAction } from "../../store/cartReducer";

function CupcakeForm() {
  const [flavor, setFlavor] = useState("");
  const [hsvaOne, setHsvaOne] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [hsvaTwo, setHsvaTwo] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [hsvaThree, setHsvaThree] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [style, setStyle] = useState("");
  const [amount, setAmount] = useState(1);
  const [openWheel, setOpenWheel] = useState("");
  const [addColorTwo, setAddColorTwo] = useState(false);
  const [addColorThree, setAddColorThree] = useState(false);
  const dispatch = useDispatch();


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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formRes = {
      id: flavor+style+(hsvaToHex(hsvaOne))+(hsvaTwo?hsvaToHex(hsvaTwo):"")+(hsvaThree?hsvaToHex(hsvaThree):""),
      flavor: flavor,
      style: style,
      color_one: hsvaToHex(hsvaOne),
      color_two: hsvaToHex(hsvaTwo),
      color_three: hsvaToHex(hsvaThree),
      type: "cupcake",
      amount: amount,
    }
    dispatch(addCupcakeAction(formRes));
    return;
  }

  // const handleSubtractSubmit = (e) => {
  //   e.preventDefault();
    
  //   const formRes = {
  //     id: flavor+style+(hsvaToHex(hsvaOne))+(hsvaTwo?hsvaToHex(hsvaTwo):"")+(hsvaThree?hsvaToHex(hsvaThree):""),
  //     flavor: flavor,
  //     style: style,
  //     color_one: hsvaToHex(hsvaOne),
  //     color_two: hsvaToHex(hsvaTwo),
  //     color_threw: hsvaToHex(hsvaThree),
  //     amount: amount,
  //   }
  //   console.log(formRes)
  //   dispatch(subtractCupcakeAction(formRes));
  //   return;
  // }


  return (
    <div className="cupcake-container">
      <div className="cupcake-container-2">
        <div className="cupcake-container-3">
          <div className="cupcake-container-4">
            <div className="cupcake-container-5">
              <div className="cupcake-container-6">
                <form onSubmit={handleSubmit}>
                  <h1 className="cupcake-h1">Create a Cupcake!</h1>
                  <p>Each order is a dozen cupcakes.</p>
                  <p>Choose atleast one color for the frosting.</p>
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
                        // pointer = {{left:0, top:0 }}
                        width = {110}
                        height = {110}
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
                          width = {110}
                          height = {110}
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
                          width = {110}
                          height = {110}
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
                      onChange={(e) => setStyle(e.target.value)}
                      required
                    >
                      <option disabled value="">
                        Select one...
                      </option>
                      <option value="Semi-Floral">Semi Floral</option>
                      <option value="Floral">Floral</option>
                      <option value="Swirl">Swirl</option>
                      <option value="Cactus">Cactus</option>
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
                      <option value="Vanilla">Vanilla</option>
                      <option value="Chocolate">Chocolate</option>
                      <option value="Lemon">Lemon</option>
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

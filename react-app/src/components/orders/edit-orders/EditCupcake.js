import HandleMultipleItems from "../../shopping-cart/HandleMultipleItems";
import { useState, Fragment, useEffect, useContext } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex, hexToHsva } from "@uiw/color-convert";
import { useDispatch } from "react-redux";
import { InfoContext } from "../../../context/InfoContext";
import { useSelector } from "react-redux";

function EditCupcake({ cupcake }) {
  const [flavor, setFlavor] = useState(cupcake.flavor);
  const [hsvaOne, setHsvaOne] = useState(hexToHsva(cupcake.color_one));
  const [hsvaTwo, setHsvaTwo] = useState(null);
  const [hsvaThree, setHsvaThree] = useState(null);
  const [style, setStyle] = useState(cupcake.style);
  const [amount, setAmount] = useState(cupcake.amount);
  const [openWheel, setOpenWheel] = useState("");
  const [addColorTwo, setAddColorTwo] = useState(false);
  const [addColorThree, setAddColorThree] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (cupcake.color_two) {
      setHsvaTwo(hexToHsva(cupcake.color_two));
      setAddColorTwo(true);
    }

    if (cupcake.color_three) {
      setHsvaThree(hexToHsva(cupcake.color_three));
      setAddColorThree(true);
    }
    setIsLoaded(true);
  }, [cupcake]);

  // handles closing the color wheel
  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      const colorWheel = document.getElementsByClassName("wheel-active")[0];
      if (
        event.target !== colorWheel &&
        event.target.parentNode !== colorWheel
      ) {
        if (colorWheel && colorWheel.style) {
          setOpenWheel("");
        }
      }
    });
  }, []);

  // handles removing items in cart with one click
  const handleRemove = (e, dessert) => {
    e.preventDefault();

    // if (dessert.type === "cupcake") {
    //   dispatch(removeCupcakeAction(dessert));
    // } else if (dessert.type === "cheesecake") {
    //   dispatch(removeCheesecakeAction(dessert));
    // } else if (dessert.type === "cookie") {
    //   dispatch(removeCookieAction(dessert));
    // }
    return;
  };

  return (
    isLoaded && (edit ?
      <>
        <p className="cart-cupcake-flavor">
          Flavor:{" "}
          <select
            className="cupcake-select-field"
            value={flavor}
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
        </p>
        <p className="cart-cupcake-style">
          Style:{" "}
          <select
            className="cupcake-select-field"
            value={style}
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
        </p>
        <span className="cart-cupcake-color-wrap">
          <Fragment>
            <div
              className="cart-cupcake-colors"
              style={{
                background: hsvaToHex(hsvaOne),
              }}
              onClick={(e) => setOpenWheel("wheel-one")}
            ></div>
            <Wheel
              // pointer = {{left:0, top:0 }}
              width={110}
              height={110}
              className={`color-wheel-one ${
                openWheel === "wheel-one" ? "wheel-active" : "wheel-not-active"
              }`}
              color={hsvaOne}
              onChange={(color) => setHsvaOne({ ...hsvaOne, ...color.hsva })}
              // onPointerLeave={e => setOpenWheel("")}
            />
          </Fragment>
          {hsvaTwo && addColorTwo ? (
            <>
              <Fragment>
                <div
                  className="cart-cupcake-colors"
                  style={{
                    background: hsvaToHex(hsvaTwo),
                  }}
                  onClick={(e) => setOpenWheel("wheel-two")}
                ></div>
                <Wheel
                  width={110}
                  height={110}
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
              {!addColorThree && (
                <span className="remove" onClick={(e) => setAddColorTwo(false)}>
                  remove
                </span>
              )}
            </>
          ) : (
            <div className="add-color" onClick={(e) => setAddColorTwo(true)}>
              Add another color
            </div>
          )}
          {hsvaThree && addColorThree ? (
            <>
              <Fragment>
                <div
                  className="cart-cupcake-colors"
                  style={{
                    background: hsvaToHex(hsvaThree),
                  }}
                  onClick={(e) => setOpenWheel("wheel-three")}
                ></div>
                <Wheel
                  width={110}
                  height={110}
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
              <span className="remove" onClick={(e) => setAddColorThree(false)}>
                remove
              </span>
            </>
          ) : (
            addColorTwo && (
              <div
                className="add-color"
                onClick={(e) => setAddColorThree(true)}
              >
                Add another color
              </div>
            )
          )}
        </span>
        <HandleMultipleItems dessert={cupcake} />
        <span className="cart-cupcake-price">
          <span className="cart-dollar-sign" >$</span>
          {cupcake.amount * 30}.00
        </span>
        <span className="cart-remove" onClick={(e) => handleRemove(e, cupcake)}>
          remove
        </span>
        {/* <h2 onClick={e => setEdit(false)}>Save Changes</h2> */}
      </> :
      (<>

                    <p className="cart-cupcake-flavor">
                      Flavor: {cupcake.flavor}
                    </p>
                    <p className="cart-cupcake-style">Style: {cupcake.style}</p>
                    <span className="cart-cupcake-color-wrap">
                      <div
                        className="cart-cupcake-colors"
                        style={{
                          background: cupcake.color_one,
                        }}
                      ></div>
                      {cupcake.color_two && (
                        <div
                          className="cart-cupcake-colors"
                          style={{
                            background: cupcake.color_two,
                          }}
                        ></div>
                      )}
                      {cupcake.color_three && (
                        <div
                          className="cart-cupcake-colors"
                          style={{
                            background: cupcake.color_three,
                          }}
                        ></div>
                      )}
                    </span>
                    <span className="order-cupcake-amount">
                    Amount: {cupcake.amount}
                  </span>
                    <span className="cart-cupcake-price">
                      <span className="cart-dollar-sign">$</span>
                      {cupcake.amount * 30}.00
                    </span>
                    {/* <h2 onClick={e => setEdit(true)}>EDIT</h2> */}
      </>)
    )
  );
}

export default EditCupcake;

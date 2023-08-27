import { useState, Fragment, useEffect } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex, hexToHsva } from "@uiw/color-convert";
import { useDispatch } from "react-redux";
import "./css/edit-cupcake.css"
import {AiOutlineMinusCircle, AiFillPlusCircle, } from "react-icons/ai";


function EditCupcake({ cupcake, hoverShowEdit, setHoverShowEdit, showEditForm, setShowEditForm}) {
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
  // const [edit, setEdit] = useState(false)
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
    isLoaded && (showEditForm === `${cupcake.id}cupcake` ?
      <div className="edit-cupcake-wrapper-in-edit-form">
        <p className="edit-cupcake-flavor">
          Flavor:{" "}
          <select
            className="edit-cupcake-select-field"
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
        <p className="edit-cupcake-style">
          Style:{" "}
          <select
            className="edit-cupcake-select-field"
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
        <span className="edit-cupcake-color-wrap">
          <span className="edit-cupcake-color-one">
          <Fragment>
            <div
              className="edit-cupcake-colors"
              style={{
                background: hsvaToHex(hsvaOne),
                cursor:"pointer"
              }}
              onClick={(e) => setOpenWheel("wheel-one")}
            ></div>
            <Wheel
              // pointer = {{left:0, top:0 }}
              width={110}
              height={110}
              className={`edit-color-wheel-one ${
                openWheel === "wheel-one" ? "wheel-active" : "wheel-not-active"
              }`}
              color={hsvaOne}
              onChange={(color) => setHsvaOne({ ...hsvaOne, ...color.hsva })}
              // onPointerLeave={e => setOpenWheel("")}
            />
          </Fragment>
          </span>
          {hsvaTwo && addColorTwo ? (
            <span className="edit-cupcake-color-two">
              <Fragment>
                <div
                  className="edit-cupcake-colors"
                  style={{
                    background: hsvaToHex(hsvaTwo),
                    cursor:"pointer"
                  }}
                  onClick={(e) => setOpenWheel("wheel-two")}
                ></div>
                <Wheel
                  width={110}
                  height={110}
                  className={`edit-color-wheel-two ${
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
                  <AiOutlineMinusCircle className="edit-minus-color"/>
                </span>
              )}
            </span>
          ) : (
            <div className="add-color" onClick={(e) => setAddColorTwo(true)}>
              <AiFillPlusCircle className="edit-plus-color" onClick={e => hsvaTwo === null ? setHsvaTwo({ h: 214, s: 43, v: 90, a: 1 }) : ""}/>
            </div>
          )}
          {hsvaThree && addColorThree ? (
            <span className="edit-cupcake-color-three">
              <Fragment>
                <div
                  className="edit-cupcake-colors"
                  style={{
                    background: hsvaToHex(hsvaThree),
                    cursor:"pointer"
                  }}
                  onClick={(e) => setOpenWheel("wheel-three")}
                ></div>
                <Wheel
                  width={110}
                  height={110}
                  className={`edit-color-wheel-three ${
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
                <AiOutlineMinusCircle className="edit-minus-color"/>
              </span>
            </span>
          ) : (
            addColorTwo && (
              <div
                className="add-color"
                onClick={(e) => setAddColorThree(true)}
              >
                <AiFillPlusCircle className="edit-plus-color" onClick={e => hsvaThree === null ? setHsvaThree({ h: 214, s: 43, v: 90, a: 1 }) : ""} />
              </div>
            )
          )}
        </span>
        <div className="edit-items-handler">
            <button onClick={e => setAmount(prevAmount => prevAmount - 1)} disabled={amount === 1 } style={{height: "30px", width: "30%", textAlign: "center", cursor: "pointer"}}>-</button>
            <input className="edit-amount-input" disabled={true} value={amount <= 10 ? amount : 10} type="text" ></input>
            <button onClick={e => setAmount(prevAmount => prevAmount + 1)} disabled={amount === 10 } style={{height: "30px", width: "30%", textAlign: "center", cursor: "pointer"}}>+</button>
        </div>
        <span className="edit-cupcake-price">Price: {" "}
          <span className="cart-dollar-sign" >$</span>
          {cupcake.amount * 30}.00
        </span>
        <span className="edit-remove" onClick={(e) => handleRemove(e, cupcake)}>
          remove
        </span>
        <button className="edit-cupcake-text-save" >Save Changes</button>
      </div> :
      (<div className="edit-cupcake-wrapper" onMouseEnter={e => setHoverShowEdit(`${cupcake.id}cupcake`)} onMouseLeave={e => setHoverShowEdit("")}>

                    <p className="edit-cupcake-flavor" >
                      Flavor: <span className="edit-flavor-text">{cupcake.flavor}</span>
                    </p>
                    <p className="edit-cupcake-style">Style: <span className="edit-style-text">{cupcake.style}</span></p>
                    <span className="edit-cupcake-color-wrap">
                      <div
                        className="edit-cupcake-colors"
                        style={{
                          background: cupcake.color_one,
                        }}
                      ></div>
                      {cupcake.color_two && (
                        <div
                          className="edit-cupcake-colors"
                          style={{
                            background: cupcake.color_two,
                          }}
                        ></div>
                      )}
                      {cupcake.color_three && (
                        <div
                          className="edit-cupcake-colors"
                          style={{
                            background: cupcake.color_three,
                          }}
                        ></div>
                      )}
                    </span>
                    <span className="edit-cupcake-amount">
                    Amount: <span className="edit-amount-text">{cupcake.amount}</span>
                  </span>
                    <span className="edit-cupcake-price">
                    Price: {" "}
                      <span className="cart-dollar-sign">$</span>
                      {cupcake.amount * 30}.00
                    </span>
                    {hoverShowEdit === `${cupcake.id}cupcake` && <span className="edit-cupcake-text" onClick={e => setShowEditForm(`${cupcake.id}cupcake`)} >EDIT</span>}
      </div>)
    )
  );
}

export default EditCupcake;

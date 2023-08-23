import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HandleMultipleItems from "./HandleMultipleItems";
import "./shopping-cart.css"


function ShoppingCart() {
  const cart = useSelector((state) => state.cartState);
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    if (cart && cart.cupcakes) {
      setCupcakes(Object.values(cart.cupcakes));
    }

    if (cart && cart.cheesecakes) {
      setCheesecakes(Object.values(cart.cheesecakes));
    }

    if (cart && cart.cookies) {
      setCookies(Object.values(cart.cookies));
    }
  }, [cart]);

  useEffect(() => {
    console.log(cupcakes);
    console.log(cheesecakes);
    console.log(cookies);
  }, [cupcakes, cheesecakes, cookies]);

  return (
    <div className="cart-container">
      <h3>Your shopping cart</h3>
      {!cupcakes.length && !cheesecakes.length && !cookies.length ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-wrap">
          {cupcakes && cupcakes.length > 0 &&
          <div>
            <p className="cart-cupcake-title">Cupcakes</p>
            {cupcakes.map(cupcake => {
  
              return (
                <div key={cupcake.id} className="cart-cupcake-wrapper">
                  <p className="cart-cupcake-flavor">Flavor: {cupcake.flavor}</p>
                  <p className="cart-cupcake-style">Style: {cupcake.style}</p>
                  <span className="cart-cupcake-color-wrap">
                    <div className="cart-cupcake-colors"
                          style={{
                            background: cupcake.color_one,
                          }}
                        ></div>
                    {cupcake.color_two && <div className="cart-cupcake-colors"
                          style={{
                            background: cupcake.color_two,
                          }}
                        ></div>}
                    {cupcake.color_three && <div className="cart-cupcake-colors"
                          style={{
                            background: cupcake.color_three,
                          }}
                        ></div>}
                  </span>
                  <HandleMultipleItems dessert={cupcake}/>
                  <span className="cart-cupcake-price"><span className="cart-dollar-sign">$</span>{cupcake.amount * 30}.00</span>
                </div>
              )
            })}
          </div>
          }
          {cheesecakes && cheesecakes.length > 0 && 
          <div>
            <p className="cart-cheesecake-title">Cheesecakes</p>
            {cheesecakes.map((cheesecake => {

              return (
                <div className="cart-cheesecake-wrapper">
                  <p className="cart-cheesecake-flavor" >Flavor: {cheesecake.flavor}</p>
                  <p className="cart-cheesecake-strawberries" >Strawberries: {cheesecake.strawberries ? "Yes" : "No"}</p>
                  <HandleMultipleItems dessert={cheesecake}/>
                  {cheesecake.strawberries ? <span className="cart-cheesecake-price"><span className="cart-dollar-sign">$</span>{cheesecake.amount * 20}.00</span> : <span className="cart-cheesecake-price"><span className="cart-dollar-sign">$</span>{cheesecake.amount * 18}.00</span>}
                </div>
              )
            }))}
          </div>}
          {cookies && cookies.length > 0 && 
          <div>
            <p className="cart-cookie-title">Cookies</p>
            {cookies.map((cookie => {

              return (
                <div className="cart-cookie-wrapper">
                  <p className="cart-cookie-flavor" >Flavor: {cookie.flavor}</p>
                  <HandleMultipleItems dessert={cookie}/>
                  <span className="cart-cookie-price"><span className="cart-dollar-sign">$</span>{cookie.amount * 10}.00</span>
                </div>
              )
            }))}
          </div>}
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;

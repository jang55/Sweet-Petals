import HandleMultipleItems from "../../shopping-cart/HandleMultipleItems";



function EditCookie({ cookies }) {

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
    <div>
        <p className="cart-cookie-title">Cookies</p>
        {cookies.map((cookie, i) => {
          return (
            <div className="cart-cookie-wrapper" key={`${cookie.id}${i}`}>
              <p className="cart-cookie-flavor">
                Flavor: {cookie.flavor}
              </p>
              <HandleMultipleItems dessert={cookie} />
              <span className="cart-cookie-price">
                <span className="cart-dollar-sign">$</span>
                {cookie.amount * 10}.00
              </span>
              <span
                className="cart-remove"
                onClick={(e) => handleRemove(e, cookie)}
              >
                remove
              </span>
            </div>
          );
        })}
      </div>
    )
}


export default EditCookie;
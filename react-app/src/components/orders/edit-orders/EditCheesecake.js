import HandleMultipleItems from "../../shopping-cart/HandleMultipleItems";


function EditCheesecake({ cheesecakes }) {

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
        <p className="cart-cheesecake-title">Cheesecakes</p>
        {cheesecakes.map((cheesecake, i) => {
          return (
            <div className="cart-cheesecake-wrapper" key={`${cheesecake.id}${i}`}>
              <p className="cart-cheesecake-flavor">
                Flavor: {cheesecake.flavor}
              </p>
              <p className="cart-cheesecake-strawberries">
                Strawberries: {cheesecake.strawberries ? "Yes" : "No"}
              </p>
              <HandleMultipleItems dessert={cheesecake} />
              {cheesecake.strawberries ? (
                <span className="cart-cheesecake-price">
                  <span className="cart-dollar-sign">$</span>
                  {cheesecake.amount * 20}.00
                </span>
              ) : (
                <span className="cart-cheesecake-price">
                  <span className="cart-dollar-sign">$</span>
                  {cheesecake.amount * 18}.00
                </span>
              )}
              <span
                className="cart-remove"
                onClick={(e) => handleRemove(e, cheesecake)}
              >
                remove
              </span>
            </div>
          );
        })}
      </div>
    )
}


export default EditCheesecake;
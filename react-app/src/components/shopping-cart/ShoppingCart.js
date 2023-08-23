import { useDispatch, useSelector } from "react-redux";


function ShoppingCart() {
    const cart = useSelector(state => state.cartState);
    


    return (
        <div className="cart-container">
            <h3>Your shopping cart</h3>

        </div>
    )
}



export default ShoppingCart
import { dateFormat } from "../../utils/helperFunctions";
import { useState, useEffect } from "react";

function OrderCard({ order }) {
    const [cupcakes, setCupcakes] = useState([]);
    const [cheesecakes, setCheesecakes] = useState([]);
    const [cookies, setCookies] = useState([]);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        if (order && order.Cupcakes) {
            setCupcakes(order.Cupcakes);
        }
    
        if (order && order.Cheesecakes) {
            setCheesecakes(order.Cheesecakes);
        }
    
        if (order && order.Cookies) {
            setCookies(order.Cookies);
        }
    }, [order]);

    return (
        <fieldset className="order-wrapper">
            <legend className="order-number">Orders ID: {order.order_number} </legend>
            <p>Pick up Date/Time: {dateFormat(order.pick_up_time)}</p>
            <p>Have you received your order? {order.order_completed ? "Yes" : "No"}</p>
            <div className="order-items-wrapper">
            {cupcakes && cupcakes.length > 0 && (
                <div className="order-cupcake-container">
                <p className="order-cupcake-title">Cupcakes</p>
                {cupcakes.map((cupcake) => {
                    return (
                    <div key={cupcake.id} className="order-cupcake-wrapper">
                        <p className="order-cupcake-flavor">
                        Flavor: {cupcake.flavor}
                        </p>
                        <p className="order-cupcake-style">Style: {cupcake.style}</p>
                        <span className="order-cupcake-color-wrap">
                        <div
                            className="order-cupcake-colors"
                            style={{
                            background: cupcake.color_one,
                            }}
                        ></div>
                        {cupcake.color_two && (
                            <div
                            className="order-cupcake-colors"
                            style={{
                                background: cupcake.color_two,
                            }}
                            ></div>
                        )}
                        {cupcake.color_three && (
                            <div
                            className="order-cupcake-colors"
                            style={{
                                background: cupcake.color_three,
                            }}
                            ></div>
                        )}
                        </span>
                        <span className="order-cupcake-amount">Amount: {cupcake.amount}</span>
                        <span className="order-cupcake-price">
                        <span className="order-dollar-sign">$</span>
                        {cupcake.amount * 30}.00
                        </span>
                    </div>
                    );
                })}
                </div>
            )}
            {cheesecakes && cheesecakes.length > 0 && (
                <div className="order-cheesecake-container">
                <p className="order-cheesecake-title">Cheesecakes</p>
                {cheesecakes.map((cheesecake) => {
                    return (
                    <div className="order-cheesecake-wrapper" key={cheesecake.id}>
                        <p className="order-cheesecake-flavor">
                        Flavor: {cheesecake.flavor}
                        </p>
                        <p className="order-cheesecake-strawberries">
                        Strawberries: {cheesecake.strawberries ? "Yes" : "No"}
                        </p>
                        {cheesecake.strawberries ? (
                        <span className="order-cheesecake-price">
                            <span className="order-dollar-sign">$</span>
                            {cheesecake.amount * 20}.00
                        </span>
                        ) : (
                        <span className="order-cheesecake-price">
                            <span className="order-dollar-sign">$</span>
                            {cheesecake.amount * 18}.00
                        </span>
                        )}
                    </div>
                    );
                })}
                </div>
            )}
            {cookies && cookies.length > 0 && (
                <div className="order-cookie-container">
                <p className="order-cookie-title">Cookies</p>
                {cookies.map((cookie) => {
                    return (
                    <div className="order-cookie-wrapper" key={cookie.id}>
                        <p className="order-cookie-flavor">
                        Flavor: {cookie.flavor}
                        </p>
                        <span className="order-cookie-price">
                        <span className="order-dollar-sign">$</span>
                        {cookie.amount * 10}.00
                        </span>
                    </div>
                    );
                })}
                </div>
            )}
        </div>
        </fieldset>
    )
}



export default OrderCard;
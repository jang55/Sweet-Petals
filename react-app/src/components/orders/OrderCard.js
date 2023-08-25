


function OrderCard({ order }) {

    return (
        <fieldset className="order-wrapper">
            <legend className="order-number">Orders ID: {order.order_number} </legend>
            <p>Pick up Date/Time: {order.pick_up_time}</p>
        </fieldset>
    )
}



export default OrderCard;
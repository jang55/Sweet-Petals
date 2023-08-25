import { dateFormat } from "../../utils/helperFunctions";


function OrderCard({ order }) {

    return (
        <fieldset className="order-wrapper">
            <legend className="order-number">Orders ID: {order.order_number} </legend>
            {/* <p>Pick up Date-Time: {order.pick_up_time}</p> */}
            <p>Pick up Date/Time: {dateFormat(order.pick_up_time)}</p>
            {/* <p>Pick up Date/Time: {dateFormat(new Date(order.pick_up_time).toString())}</p> */}
        </fieldset>
    )
}



export default OrderCard;
import { dateFormatTwo } from "../../utils/helperFunctions";
// import delete order thunk here

function DeleteOrder({ order }) {
  return (
    <div>
      <h1 className="delete-order-h1">
        Are you you want to cancel this order?
      </h1>
      <p className="delete-order-warning-message">
        The latest you can cancel the order is 2 days prior to your pick up date
      </p>
      <span className="delete-order-date-wrap">
        Your pick up date is{" "}
        <span className="delete-order-date">
          dateFormatTwo(order.pick_up_time)
        </span>
      </span>
      <div>
        <p className="delete-order-close">Close</p>
        <button className="delete-order-confirm-button">Confirm</button>
      </div>
    </div>
  );
}

export default DeleteOrder;

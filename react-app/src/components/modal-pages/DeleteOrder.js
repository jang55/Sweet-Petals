import { dateFormatTwo } from "../../utils/helperFunctions";

function DeleteOrder({ order }) {
  return (
    <div>
      <h1>Are you you want to cancel this order?</h1>
      <p>
        The latest you can cancel the order is 2 days prior to your pick up date
      </p>
      <p>Your pick up date is </p>
      <p>Close</p>
      <button>Confirm</button>
    </div>
  );
}

export default DeleteOrder;

import { dateFormatTwo } from "../../utils/helperFunctions";
import { deleteOrderThunk } from "../../store/orderReducer";
import { useDispatch } from "react-redux";
import "./css/delete-order.css";
import { useHistory } from "react-router-dom";

function DeleteOrderTwo({ order, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async () => {
        await dispatch(deleteOrderThunk(order.id));
        setShowModal(false);
        history.push("/orders/users");
    }


    return (
        <div className="delete-order-container">
        <h1 className="delete-order-h1">
            Are you you want to remove this item?
        </h1>
        <span className="delete-order-warning-message">
            Removing your only item will cancel the order. The latest you can cancel the order is 2 days prior to your pick up date.
        </span>
        <span className="delete-order-date-wrap">
            Your pick up date is:{" "}
            <span className="delete-order-date">
            {dateFormatTwo(order.pick_up_time)}
            </span>
        </span>
        <div className="delete-order-buttons-wrap">
            <button className="delete-order-close-button delete-order-button" onClick={e => setShowModal(false)} >Close</button>
            <button className="delete-order-confirm-button delete-order-button" onClick={handleDelete} >Confirm</button>
        </div>
        </div>
    );
}

export default DeleteOrderTwo;

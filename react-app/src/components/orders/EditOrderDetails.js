import "./css/edit-order.css"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderThunk } from "../../store/orderReducer";

function EditOrderDetails() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const order = useSelector(state => state.orderState);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cupcakes, setCupcakes] = useState([]);
    const [cheesecakes, setCheesecakes] = useState([]);
    const [cookies, setCookies] = useState([]);

    useEffect(() => {
        dispatch(getOrderThunk(orderId)).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch])

      // sets all the dessert items into an array
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

    

    return(
        isLoaded && <div className="edit-order-container">
            edit orders details
        </div>
    )
}


export default EditOrderDetails;
import { useEffect, useState } from "react";
import "./css/user-orders.css";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUserOrdersThunk } from "../../store/orderReducer";


function UsersOrders() {
    const usersOrders = useSelector(state => state.orderState);
    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUserOrdersThunk()).then(() => {
            setIsLoaded(true)
        });
    }, [])

    useEffect(() => {
        setOrders(Object.values(usersOrders));
    }, [usersOrders])


    return(
        isLoaded && <div className="users-orders-container">
            <h1>My Orders</h1>
            {orders.map(order => (
                <div key={order.id}>
                    <OrderCard order={order} />
                </div>
            ))}
        </div>
    )
}


export default UsersOrders;
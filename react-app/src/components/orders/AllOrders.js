import { useEffect, useState, useContext } from "react";
import "./css/user-orders.css";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrdersThunk } from "../../store/orderReducer";
import { getAllUsersThunk } from "../../store/userReducer";
import { useHistory } from "react-router-dom";
import { updateOrderStatusThunk } from "../../store/orderReducer";
import { InfoContext } from "../../context/InfoContext";



// Admin side looking at all customers orders on one page
function AllOrders() {
    const usersOrders = useSelector(state => state.orderState);
    const user = useSelector((state) => state.session.user);
    const [orders, setOrders] = useState([]);
    const [oldOrders, setOldOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { unSeenOrders, setUnSeenOrders } = useContext(InfoContext);
    

    useEffect(() => {
        if (user && user.role !== "admin") {
            history.push("/404error")
        }
    }, [user, history])

// dispatch the thunk to set redux for users orders
    useEffect(() => {
        dispatch(getAllOrdersThunk()).then(() => dispatch(getAllUsersThunk())).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch])

// get the values for each object and sorts them from most recent pickup
// to latest pick up
    useEffect(() => {
        function compareNumbers(a, b) {
            return new Date(a.pick_up_time).getTime() - new Date(b.pick_up_time).getTime();
        }

        function checkOldOrders(a) {
            // return new Date(a.pick_up_time).getTime() < new Date().getTime();
            // use this one when you have are able to complete the orders with admin user
            return new Date(a.pick_up_time).getTime() < new Date().getTime() && a.order_completed === true;
        }

        const oldOrders = [];
        const activeOrders = []
        // const sortedOrders = Object.values(usersOrders).sort(compareNumbers)

        const allOrders = Object.values(usersOrders)
        for (let i=0; i<allOrders.length; i++) {
            const order = allOrders[i];
            if(order.is_new) {
                dispatch(updateOrderStatusThunk(order.id))
                setUnSeenOrders(false)
                console.log("set orders seen to false on orders page")
            }

            if (checkOldOrders(order)) {
                oldOrders.push(order);
            } else {
                activeOrders.push(order);
            }
        }

        setOrders(activeOrders.sort(compareNumbers));
        setOldOrders(oldOrders.sort(compareNumbers))
    }, [usersOrders])


    return(
        isLoaded && user && <div className="users-orders-container">
            <h1 style={{textDecoration: "underline"}} >All customer orders</h1>
            <h2>Incompleted orders</h2>
            {orders.map(order => (
                <div key={order.id} className="order-outer-wrapper">
                    <OrderCard order={order} validOrder={true} />
                </div>
            ))}
            <div className="orders-break-line"></div>
            <h2>Completed orders</h2>
            {oldOrders.map(order => (
                <div key={order.id} className="order-outer-wrapper">
                    <OrderCard order={order} validOrder={false} />
                </div>
            ))}
        </div>
    )
}


export default AllOrders;
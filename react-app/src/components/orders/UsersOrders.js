import { useEffect, useState } from "react";
import "./css/user-orders.css";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUserOrdersThunk } from "../../store/orderReducer";
import { getAllReviewsThunk } from "../../store/reviewReducer";
import { NavLink } from "react-router-dom";


function UsersOrders() {
    const usersOrders = useSelector(state => state.orderState);
    const user = useSelector((state) => state.session.user);
    const [orders, setOrders] = useState([]);
    const [oldOrders, setOldOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();



// dispatch the thunk to set redux for users orders
    useEffect(() => {
        dispatch(getAllUserOrdersThunk())
        .then(() => {
            dispatch(getAllReviewsThunk())
        }).then(() => {
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
            <h1 style={{textDecoration: "underline"}}>My Orders</h1>
            {orders.length > 0 ? orders.map(order => (
                <div key={order.id} className="order-outer-wrapper">
                    <OrderCard order={order} validOrder={true} />
                </div>
            )) : 
            <div className="no-order-messages">
                <p>You currently do not have any orders pending.</p>
                <NavLink to="/orders/new">Click here</NavLink><span> to make your orders!</span> 
            </div>}
            <div className="orders-break-line"></div>
            <h2>Previous orders</h2>
            {oldOrders.length > 0 ? oldOrders.map(order => (
                <div key={order.id} className="order-outer-wrapper">
                    <OrderCard order={order} validOrder={false} />
                </div>
            )) : <p className="no-order-messages">No previous order!</p>}
        </div>
    )
}


export default UsersOrders;
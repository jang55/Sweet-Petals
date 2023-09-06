import "./css/create-order.css"
import { useState } from "react"
import CheesecakeForm from "./CheesecakeForm"
import CupcakeForm from "./CupcakeForm"
import CookieForm from "./CookieForm"
import { useSelector } from "react-redux"

function CreateOrderForm() {
    const [currentForm, setCurrentForm] = useState("Cupcakes");
    const user = useSelector((state) => state.session.user);

    return (
        user && <div className="create-order-container">
            <div className="c-order-buttons-wrap">
                <button 
                onClick={e => setCurrentForm("Cupcakes")} 
                className={`c-order-buttons ${currentForm === "Cupcakes" ? "c-o-active-button" : ""}`}
                >
                    Cupcakes
                </button>
                <button 
                onClick={e => setCurrentForm("Cheesecakes")} 
                className={`c-order-buttons ${currentForm === "Cheesecakes" ? "c-o-active-button" : ""}`}
                >
                    Cheesecakes
                </button>
                <button 
                onClick={e => setCurrentForm("Cookies")} 
                className={`c-order-buttons ${currentForm === "Cookies" ? "c-o-active-button" : ""}`}
                >
                    Cookies
                </button>
            </div>
            {currentForm === "Cupcakes" && <CupcakeForm />}
            {currentForm === "Cheesecakes" && <CheesecakeForm />}
            {currentForm === "Cookies" && <CookieForm />}
        </div>
    )
}


export default CreateOrderForm
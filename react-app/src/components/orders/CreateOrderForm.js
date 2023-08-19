import "./css/create-order.css"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import CheesecakeForm from "./CheesecakeForm"
import CupcakeForm from "./CupcakeForm"
import CookieForm from "./CookieForm"

function CreateOrderForm() {
    const [currentForm, setCurrentForm] = useState("Cupcakes")

    return (
        <div className="create-order-container">
            <div className="c-order-buttons-wrap">
                <button onClick={e => setCurrentForm("Cupcakes")} >
                    Cupcakes
                </button>
                <button onClick={e => setCurrentForm("Cheesecakes")} >
                    Cheesecakes
                </button>
                <button onClick={e => setCurrentForm("Cookies")} >
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
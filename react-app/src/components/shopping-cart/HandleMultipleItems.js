import {
    addCupcakeAction,
    subtractCupcakeAction,
    addCheesecakeAction,
    subtractCheesecakeAction,
    addCookieAction,
    subtractCookieAction,
    removeCheesecakeAction,
    removeCookieAction,
    removeCupcakeAction,
} from "../../store/cartReducer";
import { useDispatch } from "react-redux";



function HandleMultipleItems({ dessert }) {
    const dispatch = useDispatch();

    const handleAddingItem = (e) => {
        e.preventDefault();
        if(dessert.amount >= 10) {
            return;
        }

        if (dessert.type === "cupcake") {
            dispatch(addCupcakeAction(dessert));
        } else if (dessert.type === "cheesecake") {
            dispatch(addCheesecakeAction(dessert));
        } else if (dessert.type === "cookie") {
            dispatch(addCookieAction(dessert));
        }

        return;
    }

    const handleSubtractingItem = (e) => {
        e.preventDefault();

        if (dessert.amount <= 0) {
            if (dessert.type === "cupcake") {
                dispatch(removeCupcakeAction(dessert));
            } else if (dessert.type === "cheesecake") {
                dispatch(removeCheesecakeAction(dessert));
            } else if (dessert.type === "cookie") {
                dispatch(removeCookieAction(dessert));
            }
        }

        if (dessert.type === "cupcake") {
            dispatch(subtractCupcakeAction(dessert));
        } else if (dessert.type === "cheesecake") {
            dispatch(subtractCheesecakeAction(dessert));
        } else if (dessert.type === "cookie") {
            dispatch(subtractCookieAction(dessert));
        }

        return;
    }


    return (
        <div className="cart-items-handler">
            <button onClick={handleSubtractingItem} style={{width: "30%", textAlign: "center", cursor: "pointer"}}>-</button>
            <input disabled={true} value={dessert.amount <= 10 ? dessert.amount : 10} type="number" style={{width: "18%", textAlign: "center"}}></input>
            {dessert && dessert.amount < 10 && <button onClick={handleAddingItem} style={{width: "30%", textAlign: "center", cursor: "pointer"}}>+</button>}
        </div>
    );
}

export default HandleMultipleItems;

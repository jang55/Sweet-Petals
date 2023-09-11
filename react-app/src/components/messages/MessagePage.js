import "./css/message-page.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomerMessagesThunk, getAllMessagesThunk } from "../../store/messageReducer";
import ChatBox from "./ChatBox";



function MessagePage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const allMessages = useSelector(state => state.messageState);
    const [isLoaded, setIsLoaded] = useState(false);
    
    

    useEffect(() => {
        if(user && user.role === "customer") {
            dispatch(getCustomerMessagesThunk(user.id)).then(() => {
                setIsLoaded(true);
            });
        } else if(user && user.role === "admin") {
            dispatch(getAllMessagesThunk()).then(() => {
                setIsLoaded(true);
            });
        }

    }, [user])

    return (
        isLoaded && <div className="message-page-container">
            <h1 className="message-h1">Messages</h1>
            <p className="message-info-text">Have a question? Feel free to ask us!</p>
            <div className="message-chatbox-wrapper">
                <ChatBox messages={ Object.values(allMessages) } />
            </div>
        </div>
    )
}

export default MessagePage;
import "./css/message-card.css"
import { dateFormatThree } from "../../utils/helperFunctions";


function SenderCard({ message }) {


    return (
        <div className="chat-sender-inner-wrapper">
            {/* sender */}
            <span className="chat-message-time" >{dateFormatThree(new Date(message.created_at).toString())}</span>
            <span className="chat-message-msg" >{message.message}</span>
        </div>
    )
}

export default SenderCard;
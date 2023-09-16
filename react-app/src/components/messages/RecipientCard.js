import "./css/message-card.css"
import { dateFormatThree } from "../../utils/helperFunctions";


function RecipientCard({ message }) {


    return (
        <div className="chat-recipient-inner-wrapper">
            {/* recipient */}
            <span className="chat-message-time" >{dateFormatThree(new Date(message.created_at).toString())}</span>
            <span className="chat-message-msg" >{message.message}</span>
        </div>
    )
}

export default RecipientCard
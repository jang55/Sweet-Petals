import "./css/message-card.css"



function SenderCard({ message }) {


    return (
        <div className="chat-sender-inner-wrapper">
            {/* sender */}
            {message.message}
        </div>
    )
}

export default SenderCard;
import "./css/message-card.css"


function RecipientCard({ message }) {


    return (
        <div className="chat-recipient-inner-wrapper">
            {/* recipient */}
            {message.message}
        </div>
    )
}

export default RecipientCard
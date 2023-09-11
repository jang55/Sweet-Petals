import "./css/chatbox.css";
import SenderCard from "./SenderCard";
import RecipientCard from "./RecipientCard";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import ChatInput from "./ChatInput";


function ChatBox({ messages }) {
  const user = useSelector((state) => state.session.user);
  const [isCustomer, setIsCustomer] = useState(false);
  const chatRef = useRef()

  useEffect(() => {
    if (user && user.role === "customer") {
      setIsCustomer(true);
    }
  }, [user]);

  useEffect(() => {
    if(messages) {
      chatRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }, [messages])

  // Function to reverse a given array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

  return (
    <div className="chatbox-container">
      <div className="chat-messages-wrapper">
        {/* this is a ref to scroll after a message is sent */}
        <div ref={chatRef}></div>
        {messages &&
          reverseArray([...messages]).map((message) => {
            // console.log(message);
            return message.sender === "customer" ? (
              <div key={message.id} className="chat-sender-outer-wrapper">
                <SenderCard message={message} />
              </div>
            ) : (
              <div key={message.id} className="chat-recipient-outer-wrapper">
                <RecipientCard message={message} />
              </div>
            );
          })}
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatBox;

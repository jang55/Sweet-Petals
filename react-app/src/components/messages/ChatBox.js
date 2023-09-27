import "./css/chatbox.css";
import SenderCard from "./SenderCard";
import RecipientCard from "./RecipientCard";
import { useSelector } from "react-redux";
import { useEffect,  useRef } from "react";
import ChatInput from "./ChatInput";
import { dateFormatThree, dateFormatFour } from "../../utils/helperFunctions";
// import the socket
import { io } from 'socket.io-client';
// outside of your component, initialize the socket variable
let socket;


function ChatBox({ messages, customerId }) {
  const user = useSelector((state) => state.session.user);
  const chatRef = useRef();

  useEffect(() => {

    // create websocket/connect
    socket = io();

    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
  }, [])

  // useEffect(() => {
  //   if(messages) {
  //     chatRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start"
  //     })
  //   }
    
  // }, [messages])

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
        {/* ternary condition to determine which role is the user */}
        {messages &&
          user.role === "customer" ? reverseArray([...messages]).map((message, idx) => {
            const tempIndex = messages.length - idx - 1;
            const isNewDay =
            tempIndex === 0
              ? true
              : dateFormatThree(new Date(messages[tempIndex]?.created_at).toString()).slice(0,8) !==
                dateFormatThree(new Date(messages[tempIndex - 1]?.created_at).toString()).slice(0,8);    
            return message.sender === "customer" ? (
              <>
                <div key={message.id} className="chat-sender-outer-wrapper">
                  <SenderCard message={message} />
                </div>
                {isNewDay && <p className="chat-date-section">{dateFormatFour(new Date(message?.created_at).toString())}</p>}
              </>
            ) : (
              <>
                <div key={message.id} className="chat-recipient-outer-wrapper">
                  <RecipientCard message={message} />
                </div>
                {isNewDay && <p className="chat-date-section">{dateFormatFour(new Date(message?.created_at).toString())}</p>}
              </>
            );
            // condition if sender is admin
          }) : reverseArray([...messages]).map((message, idx) => {
            const tempIndex = messages.length - idx - 1;
            const isNewDay =
            tempIndex === 0
              ? true
              : dateFormatThree(new Date(messages[tempIndex]?.created_at).toString()).slice(0,8) !==
                dateFormatThree(new Date(messages[tempIndex - 1]?.created_at).toString()).slice(0,8);            
            return message.sender === "admin" ? (
              <>
                <div key={message.id} className="chat-sender-outer-wrapper">
                  <SenderCard message={message} />
                </div>
                {isNewDay && <p className="chat-date-section">{dateFormatFour(new Date(message?.created_at).toString())}</p>}
              </>
            ) : (
              <>
                <div key={message.id} className="chat-recipient-outer-wrapper">
                  <RecipientCard message={message} />
                </div>
                {isNewDay && <p className="chat-date-section">{dateFormatFour(new Date(message?.created_at).toString())}</p>}
              </>
            );
          })}
      </div>
      <ChatInput customerId={customerId} />
    </div>
  );
}

export default ChatBox;

import "./css/chatbox.css";
import SenderCard from "./SenderCard";
import RecipientCard from "./RecipientCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,  useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { dateFormatThree, dateFormatFour } from "../../utils/helperFunctions";
import {
  createAdminMessageThunk,
  createCustomerMessageThunk,
  getCustomerMessagesThunk
} from "../../store/messageReducer";
// import the socket
import { io } from 'socket.io-client';
// outside of your component, initialize the socket variable
let socket;

function ChatBox({ customerId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allMessages = useSelector((state) => state.messageState);
  const chatRef = useRef();
  const [messages, setMessages] = useState([...Object.values(allMessages)]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    setMessages([...Object.values(allMessages)])
  }, [allMessages])

  // *****************************************************************************
  // *****************************************************************************
  // *****************************************************************************
  // handles the web sockets for chat messages
  useEffect(() => {
    
    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("chat_response", (chat) => {
        // when we recieve a chat, add it into our messages array in state
        // setMessages(messages => [...messages, chat])
        dispatch(getCustomerMessagesThunk(chat.customer_id));
    })
    
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  // handles submission for chat
  const sendChat = async (e) => {
    e.preventDefault();

    if(chatInput.trim().length < 1) {
      return
    }

    let res;

    if (user.role === "customer") {
      res = await dispatch(createCustomerMessageThunk(user.id, chatInput));
    } else if (user.role === "admin") {
      res = await dispatch(createAdminMessageThunk(customerId, chatInput));
    }

    socket.emit("chat", {
      message_id: res["message_id"],
      message: res["message"],
      admin_id: res["admin_id"],
      customer_id: res["customer_id"],
      sender: res["sender"],
    });

    setChatInput("");
  };
  // *****************************************************************************
  // *****************************************************************************
  // *****************************************************************************

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
                <div key={`${message.id}${idx}`} className="chat-sender-outer-wrapper">
                  <SenderCard message={message} />
                </div>
                {isNewDay && <p className="chat-date-section">{dateFormatFour(new Date(message?.created_at).toString())}</p>}
              </>
            ) : (
              <>
                <div key={`${message.id}${idx}`} className="chat-recipient-outer-wrapper">
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
                <div key={`${message.id}${idx}`} className="chat-sender-outer-wrapper">
                  <SenderCard message={message} />
                </div>
                {isNewDay && <p className="chat-date-section">{dateFormatFour(new Date(message?.created_at).toString())}</p>}
              </>
            ) : (
              <>
                <div key={`${message.id}${idx}`} className="chat-recipient-outer-wrapper">
                  <RecipientCard message={message} />
                </div>
                {isNewDay && <p className="chat-date-section">{dateFormatFour(new Date(message?.created_at).toString())}</p>}
              </>
            );
          })}
      </div>
      <ChatInput chatInput={chatInput} setChatInput={setChatInput} sendChat={sendChat}/>
    </div>
  );
}

export default ChatBox;

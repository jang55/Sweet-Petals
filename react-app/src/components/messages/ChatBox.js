import "./css/chatbox.css";
import SenderCard from "./SenderCard";
import RecipientCard from "./RecipientCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,  useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import { dateFormatThree, dateFormatFour } from "../../utils/helperFunctions";
import {
  createAdminMessageThunk,
  createCustomerMessageThunk,
  getCustomerMessagesThunk,
  updateMessageThunk
} from "../../store/messageReducer";
import socket from "../../utils/Socket";
import { handleChatUpdate, chatUpdateEmitter, messageListEmitter, messageNotificationEmitter } from "../../utils/Socket";
import { InfoContext } from "../../context/InfoContext";


function ChatBox({ customerId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { userId } = useParams();
  const allMessages = useSelector((state) => state.messageState);
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { 
    setUnreadMessages,
    unreadMessagesMoreThanOne,
  } = useContext(InfoContext);


// useEffect for handling and setting messages
  useEffect(() => {
    const allMessagesArr = Object.values(allMessages)

  // loops through all the messages
    for(let i = 0; i < allMessagesArr.length; i++) {
      let message = allMessagesArr[i];
    // if any messages are unread, handles making it read depending 
    // on who sees the message.
      if(message.is_read === false) {
        if(user.role === "admin" && message.sender === "customer") {
          dispatch(updateMessageThunk(message.id, userId, message.message, true));
          if(!unreadMessagesMoreThanOne) {
            setUnreadMessages(false)
          }
        } else if(user.role === "customer" && message.sender === "admin") {
          dispatch(updateMessageThunk(message.id, userId, message.message, true));
          setUnreadMessages(false)
        }
      }
    }

    setMessages([...allMessagesArr])
  }, [allMessages, user.role, userId, dispatch])



  // *****************************************************************************
  // *****************************************************************************
  // handles the web sockets for chat messages
  // *****************************************************************************
  useEffect(() => {
    
    const callBack = (data) => dispatch(getCustomerMessagesThunk(data));

    handleChatUpdate(callBack, userId);
    
    // when component unmounts, disconnect
    return (() => {
      // socket.disconnect()
      socket.off("chat_response");
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

// socket emitter for updating chat
  chatUpdateEmitter({
    message_id: res["id"],
    message: res["message"],
    admin_id: res["admin_id"],
    customer_id: res["customer_id"],
    sender: res["sender"],
  })

// socket emitter for updating admins message list
    messageListEmitter();


// socket emitter for updating message notifications
    messageNotificationEmitter();

  // resets the chat input after message creation
    setChatInput("");
  };
  // *****************************************************************************
  // *****************************************************************************
  // *****************************************************************************



// useEffect for handling making the new messages into view
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
            return message?.sender === "customer" ? (
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
            return message?.sender === "admin" ? (
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

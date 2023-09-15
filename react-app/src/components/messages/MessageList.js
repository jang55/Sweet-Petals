import "./css/message-page.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessagesThunk } from "../../store/messageReducer";

import { dateFormatThree } from "../../utils/helperFunctions";
import { useHistory } from "react-router-dom";

function MessageList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const allMessages = useSelector((state) => state.messageState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(getAllMessagesThunk()).then(() => {
        setIsLoaded(true);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === "admin") {
      setUserMessages(Object.values(allMessages));
    }
  }, [user, allMessages]);

  const handleOpenChat = async (e, customerId) => {
    e.preventDefault();

    history.push(`/messages/users/${customerId}`);
  };

  return (
    isLoaded && user && user.role === "admin" && (
      <div className="message-page-container">
        <h1 className="message-h1">Messages List</h1>
        <p className="message-info-text">
          Your current messages with customers.
        </p>
        <div className="message-users-container">
          {userMessages.map((messages, i) => {
            const date = new Date(
              messages[messages.length - 1]?.created_at
            ).toString();
            const lastUserMessage =
              messages[messages.length - 1]?.sender === "admin"
                ? messages[messages.length - 1]?.Admin?.username
                : messages[messages.length - 1]?.Customer?.username;
            return (
              <div
                key={i}
                className="message-users-wrapper"
                onClick={(e) => handleOpenChat(e, messages[messages.length - 1]?.Customer?.id)}
              >
                <p>{messages[0]?.Customer?.username}</p>
                <span>{lastUserMessage}</span>
                <span>{dateFormatThree(date)}</span>
                <p>{messages[messages.length - 1]?.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default MessageList;

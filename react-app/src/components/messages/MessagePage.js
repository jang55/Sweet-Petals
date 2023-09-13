import "./css/message-page.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCustomerMessagesThunk,
  getAllMessagesThunk,
} from "../../store/messageReducer";
import ChatBox from "./ChatBox";
import { dateFormatThree } from "../../utils/helperFunctions";

function MessagePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allMessages = useSelector((state) => state.messageState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    if (user && user.role === "customer") {
      dispatch(getCustomerMessagesThunk(user.id)).then(() => {
        setIsLoaded(true);
      });
    } else if (user && user.role === "admin") {
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

    await dispatch(getCustomerMessagesThunk(customerId));
    setOpenChat(true);
  };

  const handleCloseChat = async (e) => {
    e.preventDefault();

    await dispatch(getAllMessagesThunk());
    setOpenChat(false);
  };

  return (
    isLoaded &&
    user && (
      <div className="message-page-container">
        <h1 className="message-h1">Messages</h1>
{/* // sets up the layout for user customer side  */}
        {user.role === "customer" ? (
          <>
            <p className="message-info-text">
              Have a question? Feel free to ask us!
            </p>
            <div className="message-chatbox-wrapper">
              <ChatBox messages={Object.values(allMessages)} />
            </div>
          </>
        ) : (
//sets up the layout for user admin side 
          <>
            {openChat ? (
              <>
            <span className="message-info-text">
                {Object.values(allMessages)[0]?.Customer?.username}
            </span>
                <p onClick={(e) => handleCloseChat(e)}>back</p>
                <div className="message-chatbox-wrapper">
                  <ChatBox messages={Object.values(allMessages)} />
                </div>
              </>
            ) : (
              <>
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
                        onClick={(e) =>
                          handleOpenChat(e, messages[0]?.Customer?.id)
                        }
                      >
                        <p>{messages[0]?.Customer?.username}</p>
                        <span>{lastUserMessage}</span>
                        <span>{dateFormatThree(date)}</span>
                        <p>{messages[messages.length - 1]?.message}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    )
  );
}

export default MessagePage;

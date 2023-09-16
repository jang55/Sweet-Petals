import "./css/message-list.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessagesThunk } from "../../store/messageReducer";
import { dateFormatThree } from "../../utils/helperFunctions";
import { useHistory } from "react-router-dom";
import { getAllUsersThunk } from "../../store/userReducer"

function MessageList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.userState);
  const allMessages = useSelector((state) => state.messageState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(getAllMessagesThunk()).then(() => {
        setIsLoaded(true);
      });
      dispatch(getAllUsersThunk());
    }
  }, [user, dispatch]);



  useEffect(() => {
    if (user && user.role === "admin") {
      function compareNums(a, b) {
        return new Date(a[a.length - 1]?.created_at).getTime() - new Date(b[b.length - 1]?.created_at).getTime()
      }

      let a = Object.values(allMessages)
      const res = a.sort(compareNums);
      setUserMessages(res.reverse());
    }
  }, [user, allMessages]);



  useEffect(() => {
    if(Object.values(errors).length > 0) {
      setErrors({});
    }
  }, [customerEmail])



  const handleOpenChat = async (e, customerId) => {
    e.preventDefault();

    history.push(`/messages/users/${customerId}`);
  };



  const handleSearchUser = (e) => {
    e.preventDefault();
    const customer = Object.values(allUsers).find(user => user.email === customerEmail)

    if(customer) {
      history.push(`/messages/users/${customer.id}`);
      return;
    } else {
      const errors = {};
      errors["email"] = "Customer not found";
      setErrors({...errors})
    }
    
  }

  return (
    isLoaded && user && user.role === "admin" && (
      <div className="message-page-container">
        <h1 className="message-h1">Messages List</h1>
        <p className="message-info-text">
          Your current messages with customers.
        </p>
        <form onSubmit={handleSearchUser}>
          <label>
            Find a customer: 
            <input type="text" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="example@aa.io"></input>
          </label>
          <button type="submit">Search</button>
        </form>
        {errors && errors.email && <p className="message-list-error">*{errors.email}</p>}
        <div className="message-users-container">
          {userMessages.map((messages, i) => {
            const date = new Date(
              messages[messages.length - 1]?.created_at
            ).toString();
            const lastUserMessageUsername =
              messages[messages.length - 1]?.sender === "admin"
                ? messages[messages.length - 1]?.Admin?.username
                : messages[messages.length - 1]?.Customer?.username;
            const lastUserIsAdmon = messages[messages.length - 1]?.sender === "admin"
            return (
              <div
                key={i}
                className="message-users-wrapper"
                onClick={(e) => handleOpenChat(e, messages[messages.length - 1]?.Customer?.id)}
              >
                <span className="message-list-customer-name-wrap">Customer: <span className="message-list-customer-name">{messages[0]?.Customer?.username}</span></span>
                <span className="message-list-customer-name-wrap">Email: <span className="message-list-customer-name">{messages[0]?.Customer?.email}</span></span>
                {lastUserIsAdmon ? <div className="message-list-message-wrap">
                  <span className="message-list-msg-item-1">Last message sent:</span>
                  <span className="message-list-msg-item-2">{lastUserMessageUsername} <span className="message-list-msg-item-3">{dateFormatThree(date)}</span></span>
                  <span className="message-list-msg-item-4">"{messages[messages.length - 1]?.message}"</span>
                </div>:
                <div className="message-list-message-wrap">
                  <span className="message-list-msg-item-1">Message received:</span>
                  <span className="message-list-msg-item-2">{lastUserMessageUsername} <span className="message-list-msg-item-3">{dateFormatThree(date)}</span></span>
                  <span className="message-list-msg-item-4">"{messages[messages.length - 1]?.message}"</span>
                </div>}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default MessageList;

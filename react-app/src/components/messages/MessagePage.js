import "./css/message-page.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomerMessagesThunk } from "../../store/messageReducer";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import {PiArrowFatLinesLeftDuotone} from "react-icons/pi"
import { useHistory } from "react-router-dom";

function MessagePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const allMessages = useSelector((state) => state.messageState);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    if (user) {
      dispatch(getCustomerMessagesThunk(userId)).then(() => {
        setIsLoaded(true);
      });
    }
  }, [user, userId, dispatch]);


  const handleBackArrow = (e) => {
    e.preventDefault();

    history.push("/messages/list")
  }

  return (
    isLoaded &&
    user &&
    (
      <div className="message-page-container">
        <h1 className="message-h1">Messages</h1>
        {user.role === "customer" ? <p className="message-info-text">
          Have a question? Feel free to ask us!
        </p> :<span onClick={handleBackArrow} ><PiArrowFatLinesLeftDuotone /> Messages List</span> }
        <div className="message-chatbox-wrapper">
          <ChatBox messages={allMessages ? Object.values(allMessages) : []} customerId={userId} />
        </div>
      </div>
    )
  );
}

export default MessagePage;

import "./css/chat-input.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createAdminMessageThunk,
  createCustomerMessageThunk,
} from "../../store/messageReducer";
import { BiSolidRightArrow } from "react-icons/bi"



function ChatInput({ customerId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = (e) => {
    e.preventDefault();

    if(chatInput.trim().length < 1) {
      return
    }

    if (user.role === "customer") {
      dispatch(createCustomerMessageThunk(user.id, chatInput));
    } else if (user.role === "admin") {
      dispatch(createAdminMessageThunk(customerId, chatInput));
    }

    setChatInput("");
  };

  return (
    <form className="chatbox-input-wrapper" onSubmit={handleChatSubmit}>
      <input
        type="text"
        className="chatbox-input"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        minLength={1}
        maxLength={1000}
        autoComplete="off"
      />
      <button type="submit" className="chat-input-submit-button"><BiSolidRightArrow className="chat-input-submit-arrow"/></button>
    </form>
  );
}

export default ChatInput;

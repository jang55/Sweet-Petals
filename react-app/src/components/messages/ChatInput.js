import "./css/chat-input.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createAdminMessageThunk,
  createCustomerMessageThunk,
} from "../../store/messageReducer";

function ChatInput() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = (e) => {
    e.preventDefault();

    if (user.role === "customer") {
      dispatch(createCustomerMessageThunk(user.id, chatInput));
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
        maxLength={1000}
      />
    </form>
  );
}

export default ChatInput;

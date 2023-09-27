import "./css/chat-input.css";
import { useSelector } from "react-redux";
// import { useState } from "react";
// import {
//   createAdminMessageThunk,
//   createCustomerMessageThunk,
// } from "../../store/messageReducer";
import { BiSend } from "react-icons/bi"



function ChatInput({chatInput, setChatInput, sendChat }) {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  return (
    <form className="chatbox-input-wrapper" onSubmit={sendChat}>
      <input
        type="text"
        className="chatbox-input"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        minLength={1}
        maxLength={1000}
        autoComplete="off"
      />
      <button type="submit" className="chat-input-submit-button"><BiSend className="chat-input-submit-arrow"/></button>
    </form>
  );
}

export default ChatInput;

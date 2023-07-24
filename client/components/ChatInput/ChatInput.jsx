import React from "react";
import { BiSend } from "react-icons/bi";
import "./chatInput.css";
function ChatInput(props) {
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      props.handleSubmit(event);
    }
  }

  return (
    <div className="chat-input">
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        className="message-input"
      />
      <div onClick={props.handleSubmit} className="send-button">
        <BiSend size={20} color="red" />
      </div>
    </div>
  );
}

export default ChatInput;

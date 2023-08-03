import React, { useState } from "react";
import "./LoggedInAiChat.css";
import ChatInput from "../ChatInput/ChatInput";
import ConversationBody from "../ConversationBody/ConversationBody";

function LoggedInAiChat(props) {
  return (
    <div
      className="loggedin-ai-chat"
      style={{ width: props.width, left: props.section2 }}
    >
      <section className="prompts">
        <ConversationBody />
      </section>
      <ChatInput />
    </div>
  );
}

export default LoggedInAiChat;

import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import "./chatInput.css";
import createZendeskTicket from "../../apis/createZendesk";
function ChatInput(props) {
  const [ticketBody, setTicketBody] = useState("");

  const ticketData = {
    subject: "orem Ipsum is simply dummy text",
    description: ticketBody,
    requesterName: "rex",
    requesterEmail: "john.doe@example.com",
    priority: "low",
    status: "pending",
  };
  // console.log(ticketData);

  const handleNewTicket = () => {
    createZendeskTicket(ticketData);
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleNewTicket(event);
    }
  }

  return (
    <div className="chat-input">
      <input
        type="text"
        value={ticketBody}
        onChange={(e) => setTicketBody(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        className="message-input"
      />
      <button onClick={handleNewTicket} className="send-button">
        <BiSend size={20} color="red" />
      </button>
    </div>
  );
}

export default ChatInput;

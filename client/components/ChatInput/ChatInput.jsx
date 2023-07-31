import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import "./chatInput.css";
import useFetch from "../../hooks/useFetch";
import createZendeskTicket from "../../apis/createZendesk";

function ChatInput(props) {
  const [ticketBody, setTicketBody] = useState("");
  const fetch = useFetch();

  const ticketData = {
    subject: "orem Ipsum is simply dummy text",
    description: ticketBody,
    requesterName: "rex",
    requesterEmail: "john.doe@example.com",
    priority: "low",
    status: "pending",
  };
  // console.log(ticketData);

  function createZendeskTicket(ticketData) {
// console.log(ticketData);
    fetch("api/createZendeskTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Zendesk ticket created successfully!");
        } else {
          alert("Failed to create Zendesk ticket. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error creating Zendesk ticket:", error);
        alert(
          "An error occurred while creating the Zendesk ticket. Please try again later."
        );
      });
  }

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

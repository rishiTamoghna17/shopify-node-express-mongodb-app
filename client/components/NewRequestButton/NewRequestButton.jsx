import React from "react";
import { TiMessage } from "react-icons/ti";
import "./NewRequestButton.css";
import useFetch from "../../hooks/useFetch";

function NewRequestButton(props) {

  const fetch = useFetch();

  const handleNewTicket = () => {
    createZendeskTicket();
  };

  function createZendeskTicket() {
    const ticketData = {
      subject: "orem Ipsum is simply dummy text", 
      description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
      requesterName: "John Doe", 
      requesterEmail: "john.doe@example.com", 
    };

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
  return (
    <div className="conversation-footer-button-cls">
      <button type="button" className="refresh-button" onClick={handleNewTicket}>
        {<TiMessage color="white" size="30px" />}start new request
      </button>
    </div>
  );
}

export default NewRequestButton;

import React from "react";
import { TiMessage } from "react-icons/ti";
import "./NewRequestButton.css";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
function NewRequestButton(props) {
  const fetch = useFetch();
  const conversation = useSelector((state) => state.conversation).slice(-1)[0];
  const conversationArray = conversation ? Object.values(conversation) : [];
  // Filter messages where user is 'AI'
  const Userdata = conversationArray.filter(message => message.user !== 'AI').slice(-1)[0];
  // console.log("user",Userdata.user);
  // console.log("user message",Userdata.message);

  const handleNewTicket = () => {
    createZendeskTicket();
  };

  function createZendeskTicket() {
    const ticketData = {
      subject: "orem Ipsum is simply dummy text",
      description:Userdata.message,
      requesterName: Userdata.user,
      requesterEmail: "john.doe@example.com",
    };
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
  return (
    <div className="conversation-footer-button-cls">
      <button
        type="button"
        className="refresh-button"
        onClick={handleNewTicket}
      >
        {<TiMessage color="white" size="30px" />}start new request
      </button>
    </div>
  );
}

export default NewRequestButton;

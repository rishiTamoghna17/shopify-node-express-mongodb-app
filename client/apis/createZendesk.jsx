
import useFetch from "../hooks/useFetch";


export default function createZendeskTicket(ticketData) {
    const fetch = useFetch();
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
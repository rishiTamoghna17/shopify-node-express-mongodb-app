import React, { useState } from "react";
import "./LoggedInDetailConversation.css";
import DetailConversationHead from "../DetailConversationHead/DetailConversationHead";
import PoweredByLogo from "../PoweredByLogo/PoweredByLogo";

function LoggedInDetailConversation(props) {
  const [requests, setRequests] = useState([]);

  const handleNewRequest = (requestType) => {
    const newRequest = {
      type: requestType,
      status: "in progress",
      response: "",
    };
    setRequests([...requests, newRequest]);
  };

  const handleResponse = (index, response) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "completed";
    updatedRequests[index].response = response;
    setRequests(updatedRequests);
  };

  return (
    <div
      className="loggedin-detail-conversation"
      style={{ width: props.width, left: props.section3 }}
    >
      <DetailConversationHead merchantLogo={props.merchantLogo} />

      <div className="container">
        <h1>Support Request Status</h1>
        <button
          className="request-btn"
          onClick={() => handleNewRequest("Delivery Status")}
        >
          Check Delivery Status
        </button>
        <button className="request-btn" onClick={() => handleNewRequest("FAQ")}>
          FAQ
        </button>
        <button
          className="request-btn"
          onClick={() => handleNewRequest("Product Suggestions")}
        >
          Product Suggestions
        </button>

        {requests.map((request, index) => (
          <div key={index} className="request">
            <h2>{request.type}</h2>
            <p className="status">Status: {request.status}</p>
            {request.status === "completed" && (
              <p className="response">Response: {request.response}</p>
            )}
            {request.status === "in progress" && (
              <button
                className="response-btn"
                onClick={() => handleResponse(index, "Dummy response")}
              >
                Provide Response
              </button>
            )}
            <hr className="divider" />
          </div>
        ))}
      </div>

      <PoweredByLogo merchantLogo={props.merchantLogo} />
    </div>
  );
}

export default LoggedInDetailConversation;

import React, { useState } from "react";
import "./LoggedInDetailConversation.css";
import DetailConversationHead from "../DetailConversationHead/DetailConversationHead";
import PoweredByLogo from "../PoweredByLogo/PoweredByLogo";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgLoadbarAlt } from "react-icons/cg";
import { BsDot } from "react-icons/bs";

function LoggedInDetailConversation(props) {
  const members = [
    { name: "user1", isActive: true, icon: props.merchantLogo },
    {
      name: "Under Armour Assistant Ai",
      isActive: true,
      icon: props.merchantLogo,
    },
  ];
  const [requests, setRequests] = useState([
    {
      type: "Delivery Status",
      status: "in progress",
    },
  ]);

  // const [requests, setRequests] = useState([]);
  // const handleNewRequest = (requestType) => {
  //   const newRequest = {
  //     type: requestType,
  //     status: "in progress",
  //     response: "",
  //   };
  //   setRequests([...requests, newRequest]);
  // };

  // const handleResponse = (index, response) => {
  //   const updatedRequests = [...requests];
  //   updatedRequests[index].status = "completed";
  //   updatedRequests[index].response = response;
  //   setRequests(updatedRequests);
  // };

  return (
    <div
      className="loggedin-detail-conversation"
      style={{ width: props.width, left: props.section3 }}
    >
      <DetailConversationHead merchantLogo={props.merchantLogo} />

      <div className="loggedin-detail-conversation-support-request">
        <div className="loggedin-detail-conversation-support-request-title">
          <h1>Support Request Status</h1>
        </div>
        {requests.map((request, index) => (
          <div className="loggedin-detail-conversation-support-request-log">
            <div
              key={index}
              className="detail-conversation-support-request-type-status"
            >
              <div className="detail-conversation-support-request-type">
                <div className="detail-conversation-support-request-type-icon-one">
                  {request.status === "in progress" ? (
                    <AiOutlineLoading3Quarters color="red" size={20} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="detail-conversation-support-request-response">
                  <h2>{request.type}</h2>
                  <p>{request.status}</p>
                </div>
              </div>
              <div className="detail-conversation-support-request-type-icon-two">
                {request.status === "in progress" ? (
                  <CgLoadbarAlt color="red" size={25} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="loggedin-detail-conversation-support-conversation-members">
        <div className="loggedin-detail-conversation-support-conversation-members-title">
          <h1>Mumbers in this conversation ({members.length})</h1>
        </div>
        {members?.map((member) => (
          <div className="loggedin-detail-conversation-support-conversation-align">
            <div
              className="loggedin-detail-conversation-support-conversation-members-member-map"
              key={member.id}
            >
              <div className="loggedin-detail-conversation-support-conversation-members-member-icon-name-agent">
                <div>{member.icon}</div>
                <div className="loggedin-detail-conversation-support-conversation-members-name-agent">
                  <p className="loggedin-detail-conversation-support-conversation-members-name">{member.name}</p>
                  <p className="loggedin-detail-conversation-support-conversation-members-name-smaller">
                    {member.name === "Under Armour Assistant Ai"
                      ? "Ai Agent"
                      : "you"}
                  </p>
                </div>
              </div>
            </div>
            <div className="loggedin-detail-conversation-support-conversation-members-member-status-active">
              {member.isActive ? (
                <BsDot color="green" size={40} />
              ) : (
                <BsDot color="red" size={40} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="container">
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
      </div> */}

      <PoweredByLogo merchantLogo={props.merchantLogo} />
    </div>
  );
}

export default LoggedInDetailConversation;

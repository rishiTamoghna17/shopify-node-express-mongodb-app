import React, { useState } from "react";
import "./LoggedInAiChat.css";
import { AiOutlineSearch, AiOutlineClockCircle } from "react-icons/ai";
import { MdFavoriteBorder, MdReport } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";

function LoggedInAiChat(props) {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("user1");
  const [requestId, setRequestId] = useState("# abcD123");
  const [ticketId, setTicketId] = useState("# idquD123");

  const getTimeElapsed = (timestamp) => {
    // Use moment.js or any other library to calculate the elapsed time
    return moment(timestamp).fromNow();
  };

  const handleSendMessage = () => {
    // Here you can handle sending the message to the AI and updating the conversation state
    const response =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"; // Replace with actual AI response
    if (message.trim() !== "") {
      setConversation([
        ...conversation,
        { user: selectedCustomer, message },
        { user: "AI", message: response },
      ]);
      setMessage("");
    }
  };

  console.log(conversation);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCustomerChange = (e) => {
    e.preventDefault();
    setSelectedCustomer(e.target.value);
  };

  return (
    <div
      className="loggedin-ai-chat"
      style={{ width: props.width, left: props.section2 }}
    >
      <div className="chat-header">
        <div className="chat-header-text">
          <select
            value={selectedCustomer}
            onChange={handleCustomerChange}
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "none",
            }}
          >
            <option
              value="User1"
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              }}
            >
              User1
            </option>
            <option
              value="User2"
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              }}
            >
              User2
            </option>
          </select>
        </div>
        <div className="chat-header-text">
          <h1
            style={{ color: "white", fontWeight: "bold", marginRight: "10px" }}
          >
            Request ID: {requestId}
          </h1>
          <h1
            style={{ color: "white", fontWeight: "bold", marginRight: "10px" }}
          >
            Ticket ID: {ticketId}
          </h1>
        </div>
        <div className="chat-icons">
          <i className="favorite-icon chat-icon">
            <MdFavoriteBorder size={20} />
          </i>
          <i className="report-icon chat-icon">
            <MdReport size={20} />
          </i>
          <i className="snooze-icon chat-icon">
            <AiOutlineClockCircle size={20} />
          </i>
          <i className="search-icon chat-icon">
            <AiOutlineSearch size={20} />
          </i>
          <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
            <i
              className="dropdown-icon chat-icon"
              onClick={handleDropdownToggle}
            >
              <BsThreeDotsVertical size={20} />
            </i>
            <div className="dropdown-content">
              <div className="dropdown-item">Like</div>
              <div className="dropdown-item">Dislike</div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-body">
        {conversation.map((entry, index) => (
          <div key={index} className="chat-message">
            <div
              className={
                entry.user === selectedCustomer ? "user-message" : "ai-message"
              }
            >
              <div className="message-content">
                <div className="user-info">
                  <strong>{entry.user}:</strong>
                  <div className="chat-time-dot">
                  <span className="time-elapsed">
                    {getTimeElapsed(entry.timestamp)}
                  </span>
                  

                
                  <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
            <i
              className="dropdown-icon chat-icon"
              onClick={handleDropdownToggle}
            >
              <BsThreeDotsVertical size={20} />
            </i>
            <div className="dropdown-content">
              <div className="dropdown-item">Like</div>
              <div className="dropdown-item">Dislike</div>
            </div>
          </div>



                  {/* <BsThreeDotsVertical color="white" size= "15px" /> */}
                  </div>
                </div>
                <div className="message">{entry.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          <BiSend size={20} color="red" />
        </button>
      </div>
    </div>
  );
}

export default LoggedInAiChat;

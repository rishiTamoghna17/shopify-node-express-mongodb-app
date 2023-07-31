import React,{useState,useEffect} from "react";
import { AiOutlineSearch, AiOutlineClockCircle } from "react-icons/ai";
import { MdFavoriteBorder, MdReport } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import { useDispatch } from "react-redux";
import { add } from "../../reduxStore/slices/conversation";
import useFetch from "../../hooks/useFetch";
import './ConversationBody.css'
function ConversationBody() {
  const [conversation, setConversation] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    new Array(conversation.length).fill(false)
  );
  const [iconIsDropdownOpen, setIconIsDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("user1");
  const [requestId, setRequestId] = useState("# abcD123");
  const [ticketId, setTicketId] = useState("29");
  const [message, setMessage] = useState("");
  const fetch = useFetch();
 
  useEffect(() => {
    // Fetch conversations from your backend API
    fetch(`/api/tickets/${ticketId}/conversations`)
      .then((response) => response.json())
      .then((data) => setConversation(data))
      .catch((error) => console.error('Error fetching conversations:', error));
  }, [ticketId]);

  console.log("conversation", conversation);

  const getTimeElapsed = (timestamp) => {
    // Use moment.js to calculate the elapsed time
    return moment(timestamp).fromNow();
  };

  const handleIconDropdownToggle = () => {
    setIconIsDropdownOpen(!iconIsDropdownOpen);
  };

  const handleDropdownToggle = (index) => {
    setIsDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleCustomerChange = (e) => {
    e.preventDefault();
    setSelectedCustomer(e.target.value);
  };
  return (
    <>
    
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
          <div className={`dropdown ${iconIsDropdownOpen ? "show" : ""}`}>
            <i
              className="dropdown-icon chat-icon"
              onClick={handleIconDropdownToggle}
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
        {conversation && conversation?.map((entry, index) => (
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

                    <div
                      className={`dropdown ${
                        isDropdownOpen[index] ? "show" : ""
                      }`}
                    >
                      <i
                        className="dropdown-icon chat-icon"
                        onClick={() => handleDropdownToggle(index)}
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
                <div className="message">{entry.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ConversationBody;

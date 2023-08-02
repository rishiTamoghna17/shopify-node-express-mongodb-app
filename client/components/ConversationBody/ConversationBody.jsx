import React,{useState,useEffect} from "react";
import { AiOutlineSearch, AiOutlineClockCircle } from "react-icons/ai";
import { MdFavoriteBorder, MdReport } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import './ConversationBody.css'
import {useSelector} from 'react-redux'

function ConversationBody() {
  const [conversation, setConversation] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    new Array(conversation.length).fill(false)
  );
  const [iconIsDropdownOpen, setIconIsDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("user1");
  const [requestId, setRequestId] = useState("# abcD123");
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState({})
  const fetch = useFetch();
  const createdTicket = useSelector(state => state.ticketData).slice(-1)[0]

  useEffect(() => {
  setTicket(createdTicket?.result)
  setTicketId(createdTicket?.result?.id)
  },[createdTicket])


  const fetchConversations = () => {
    if (ticketId === undefined) {
      setConversation([]);
    } else {
      fetch(`/api/tickets/${ticketId}/conversations`)
        .then((response) => response.json())
        .then((data) => setConversation(data))
        .catch((error) => console.error('Error fetching conversations:', error));
    }
  };
 // Initial fetch when ticketId changes
//  useEffect(() => {
//    fetchConversations();
//  },[]);
    fetchConversations()


  // console.log("conversation", conversation);
  // console.log("createdTicket",ticket)

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
  // const userTxt = conversation.filter((data)=>data.author_id ===ticket.requester_id)
  // const agentTxt = conversation.filter((data)=>data.author_id ===ticket.assignee_id)

  
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
        {conversation.length!==0 && conversation?.map((entry, index) => (
          
          <div key={index} className="chat-message">
            <div
              className={
                entry.author_id === ticket.requester_id ? "user-message" : "agent-message"
              }
            >
              <div className="message-content">
                <div className="user-info">
                  <strong>{(entry.author_id===ticket.requester_id?"user":"agent")}:</strong>
                  <div className="chat-time-dot">
                    <span className="time-elapsed">
                      {getTimeElapsed(entry.created_at)}
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

import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import "./ConversionScreen.css";
import NewRequestButton from "../NewRequestButton/NewRequestButton";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add } from "../../reduxStore/slices/showConversation";


const ConversationScreen = (props) => {
  const [filter, SetFilter] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [selectedDropDownFilter, setSelectedDropDownFilter] = useState("");

  const fetch = useFetch();
  // const conversation = useSelector((state) => state.conversation).slice(-1)[0];
  const createdTicket = useSelector((state) => state.ticketData).slice(-1)[0];


  async function fetchData() {
    setIsLoading(true);
    const res = await fetch("/api/tickets");
    const response = await res.json();
    console.log(response);
    if (response.error) {
      setConversation([]);
    } else {
      console.log('setConversation',response)
      setConversation(response);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [createdTicket]);
  console.log("conversation", conversation);


  const dispatch = useDispatch();
  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    
  };
  useEffect(()=>{
    dispatch(add(selectedConversation));
  },[selectedConversation])
// console.log("selectedConversation",selectedConversation)

const filteredData = conversation?.filter((user) => {
  const matchesSubject = user.subject.toLowerCase().includes(filter);

  if (selectedDropDownFilter === "") {
    return matchesSubject; // Only apply subject filter
  } else if (selectedDropDownFilter === "open") {
    return matchesSubject && user.status === "open"; // Apply both subject and status filters
  } else if (selectedDropDownFilter === "closed") {
    return matchesSubject && (user.status === "closed" || user.status === "solved") ; // Apply both subject and status filters
  }
});

  return (
    <div
      className="ConversationScreenWithhoutLogIn"
      style={{ width: props.width, left: props.section1 }}
    >
       
        
      <div className="conversation-all-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search conversations"
            className="rounded-input"
            onChange={(e) => SetFilter(e.target.value)}
          />
        </div>
        <div className="conversation-header-row">
          <div className="conversation-header-dropdown">
            {/* Conversation status dropdown */}
            <select value={selectedDropDownFilter} onChange={(e) => setSelectedDropDownFilter(e.target.value)}>
              <option className="conversation-header-dropdown-option" value="">All</option>
              <option className="conversation-header-dropdown-option" value="open">Open</option>
              <option className="conversation-header-dropdown-option" value="closed">Closed</option>
            </select>

            {/* Refresh button */}
            <div className="conversation-header-refresh-button-edit">
              <button className="conversation-header-refresh-button">
                <BiRefresh size={20} color="white" />
              </button>

              {/* Filter button */}
              <button className="filter-button">
                <FiFilter size={20} color="white" />
              </button>
            </div>
          </div>
        </div>
<h1 className="text-white">{filteredData?.length}</h1>
        {/* Conversation data */}
        {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="conversation-list">
          {filteredData?.map((conversation) => (
            <div
              className="conversation-item"
              key={conversation.id}
              onClick={() => handleConversationClick(conversation)}
            >
              <div className="conversation-info">
                <h4 className="conversation-title">{conversation.subject}</h4>
                <p className="conversation-details">
                  {conversation.description}
                </p>
                <div className="conversation-support">
                  <span className="support-type">
                    <span className="support-icon">
                      {conversation.supportIcon}
                    </span>
                    {conversation.supportType}
                  </span>
                  <span className="favorite-icon">
                    {conversation.isFavorite ? <FaStar /> : <FaRegStar />}
                  </span>
                </div>
              </div>
              <span className="conversation-time">{conversation.time}</span>
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="conversation-footer">
        <NewRequestButton />
      </div>
      
    </div>
  );
};

export default ConversationScreen;

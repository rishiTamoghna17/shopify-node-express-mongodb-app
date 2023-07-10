import React from "react";
import { BiRefresh } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import "./ConversionScreen.css";

const ConversationScreen = (props) => {
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
          />
        </div>
        <div className="conversation-header-row">
          <div className="conversation-header">
            {/* Conversation status dropdown */}
            <select>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>

            {/* Refresh button */}
            <button className="refresh-button">
              <BiRefresh size={20} color = "white" />
            </button>

            {/* Filter button */}
            <button className="filter-button">
              <FiFilter size={20} color = "white" />
            </button>
          </div>
        </div>

        {/* Conversation data */}
        <div className="conversation-list">
          {props?.conversations.map((conversation) => (
            <div className="conversation-item" key={conversation.id}>
              <div className="conversation-info">
                <h4 className="conversation-title">{conversation.title}</h4>
                <p className="conversation-details">{conversation.details}</p>
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
      </div>
      <div className="conversation-footer">
        <div className="conversation-footer-button-cls">
          <button type="button" className="refresh-button">
            {<TiMessage color="white" size="30px" />}start new request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationScreen;

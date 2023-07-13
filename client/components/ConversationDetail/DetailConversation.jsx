import React, { useState } from "react";
import "./DetailConversation.css";
import {
  AiOutlineBell,
  AiOutlineLink,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

function DetailConversation(props) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [assignee, setAssignee] = useState("Under Armour Assist AI");
  const [assigneeStatus, setAssigneeStatus] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // notification switch
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#000000",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#38761d",
          // theme.palette.mode === '#cc0000' ? '#cc0000' : '#cc0000',
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: "#38761d",
      // theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: "border-box",
    },
  }));

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="notifications-ai-chat"
      style={{ width: props.width, left: props.section3 }}
    >
      <div className="notification-header">
        <div className="notifications-section">
          <div className="notifications-toggle">
            {notificationsEnabled ? (
              <AntSwitch
                defaultChecked
                inputProps={{ "aria-label": "ant design" }}
                onClick={handleToggleNotifications}
              />
            ) : (
              <AntSwitch
                inputProps={{ "aria-label": "ant design" }}
                onClick={handleToggleNotifications}
              />
            )}
            <span className="toggle-label">
              {notificationsEnabled ? "Notifications On" : "Notifications Off"}
            </span>
          </div>
          <div className="notification-nav-icon">
            <div className="link-icon">
              <a
                href="https://admin.shopify.com/store/quickstart-b1d6d5a7/apps/app_dashboard/default"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFillQuestionCircleFill color="white" size={20} />
              </a>
            </div>
            <div className="notification-icon">
              <RiNotificationBadgeFill color="white" size={20} />
              {/* <span className="notification-count">3</span> */}
            </div>
          </div>
        </div>
        <div className="profile-section">
          <div className="assignee-details">Conversation Assigned To.. </div>
          <div className="profile-section-assign-card">
            <div className="profile-section-assign-merchant-logo">
              {props.merchantLogo}
            </div>
            <div className="profile-section-assignee-name-status">
              <div className="profile-section-assignee">{assignee}</div>
              <div className="profile-section-assignee-status">
                <h1
                  className={
                    assigneeStatus
                      ? "profile-section-assignee-status-active"
                      : "profile-section-assignee-status-deactive"
                  }
                >
                  status
                </h1>{" "}
                <h1 className="profile-section-assignee-status-status">
                  {assigneeStatus ? "active" : "deactive"}
                </h1>{" "}
              </div>
            </div>
            <div className="profile-section-assignee-status-link-icon">
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
        </div>
        <div className="profile-section-ai-merchant-logo">
          <img
            className="merchant-logo-image"
            src="/AI_Chatbots.png"
            alt="logo"
          />
        </div>
      </div>

      <div className="chat-inputt">
        {" "}
        <h1 className="chat-input-powered-by">powered by</h1>
        <div className="chat-input-merchant-logo">{props.merchantLogo}</div>
      </div>
    </div>
  );
}

export default DetailConversation;

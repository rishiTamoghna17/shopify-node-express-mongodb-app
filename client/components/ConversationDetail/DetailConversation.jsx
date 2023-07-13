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
import DetailConversationHead from "../DetailConversationHead/DetailConversationHead";
import PoweredByLogo from "../PoweredByLogo/PoweredByLogo";

function DetailConversation(props) {
  

  return (
    <div
      className="notifications-ai-chat"
      style={{ width: props.width, left: props.section3 }}
    >
      <DetailConversationHead  merchantLogo={props.merchantLogo}/>

     <PoweredByLogo merchantLogo={props.merchantLogo}/>
    </div>
  );
}

export default DetailConversation;

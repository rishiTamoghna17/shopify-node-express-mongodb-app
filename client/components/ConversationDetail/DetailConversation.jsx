import React, { useState } from "react";
import "./DetailConversation.css";
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

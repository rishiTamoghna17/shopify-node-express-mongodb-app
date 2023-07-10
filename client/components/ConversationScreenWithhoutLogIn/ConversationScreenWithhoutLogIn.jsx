import React from "react";
import "./ConversationScreenWithhoutLogIn.css";
import { TiMessage } from "react-icons/ti";
function ConversationScreenWithhoutLogIn(props) {
  return (
    <div
      className="ConversationScreenWithhoutLogIn"
      style={{ width: props.width, left: props.section1 }}
    >
      <div className="conversation-header">
        <div className="conversation-header-convo">
          <h1 className="conversation-header-convo-content">Wellcome to Armour customer support!</h1>
        </div>

        <div className="conversation-header-convo">
          <h1 className="conversation-header-convo-content">
            Our advanced AI support tool is design to provide you the instant
            response and support.
          </h1>
        </div>

        <div className="conversation-header-convo">
          <h1 className="conversation-header-convo-content">Feel free to describe any issue or ask any questions you have.</h1>
        </div>

        <div className="conversation-header-convo">
          <h1 className="conversation-header-convo-content">
            We look forward to helping you and making your customer experiance
            with us a better one.
          </h1>
        </div>
      </div>
      <div className="conversation-footer">
        <div className="conversation-footer-button-cls">
        <button type="button" className="refresh-button">
          {<TiMessage color="white" size="30px"/>}start new request 
        </button>
        </div>
      </div>
    </div>
  );
}

export default ConversationScreenWithhoutLogIn;

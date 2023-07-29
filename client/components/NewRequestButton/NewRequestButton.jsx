import React from "react";
import { TiMessage } from "react-icons/ti";
import "./NewRequestButton.css";
import { useSelector } from "react-redux";
function NewRequestButton(props) {

  const conversation = useSelector((state) => state.conversation).slice(-1)[0];
  const conversationArray = conversation ? Object.values(conversation) : [];
  // Filter messages where user is 'AI'
  const Userdata = conversationArray.filter(message => message.user !== 'AI').slice(-1)[0];
  // console.log("user",Userdata.user);
  // console.log("user message",Userdata.message);

  const handleNewTicket = () => {
  console.log("cteate new ticket")
  };


  return (
    <div className="conversation-footer-button-cls">
      <button
        type="button"
        className="refresh-button"
        onClick={handleNewTicket}
      >
        {<TiMessage color="white" size="30px" />}start new request
      </button>
    </div>
  );
}

export default NewRequestButton;

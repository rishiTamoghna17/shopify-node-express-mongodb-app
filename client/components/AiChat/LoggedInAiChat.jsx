import React, { useState } from "react";
import "./LoggedInAiChat.css";
import ChatInput from "../ChatInput/ChatInput"; 
import ConversationBody from "../ConversationBody/ConversationBody";


function LoggedInAiChat(props) {
  // const [message, setMessage] = useState("");

  // const handleSendMessage = () => {
  //   //  handle sending the message to the AI and updating the conversation state
  //   const response =
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
  //   if (message.trim() !== "") {
  //     setConversation([
  //       ...conversation,
  //       { user: selectedCustomer, message },
  //       { user: "AI", message: response },
  //     ]);
  //     dispatch(add([
  //       ...conversation,
  //       { user: selectedCustomer, message },
  //       { user: "AI", message: response },
  //     ]));
  //     setMessage("");
  //   }
  // };

  // console.log(conversation);


  return (
    <div
      className="loggedin-ai-chat"
      style={{ width: props.width, left: props.section2 }}
    >
      <ConversationBody/>
      <ChatInput
      //  value = {message} handleSubmit = {handleSendMessage} onChange = {setMessage} 
       />
    </div>
  );
}

export default LoggedInAiChat;

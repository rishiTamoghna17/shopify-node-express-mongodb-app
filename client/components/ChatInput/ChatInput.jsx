  import React, { useState,useEffect } from "react";
  import { BiSend } from "react-icons/bi";
  import "./chatInput.css";
  import useFetch from "../../hooks/useFetch";
  import createZendeskTicket from "../../apis/createZendesk";
  import { useDispatch } from "react-redux";
  import { addTicketData } from "../../reduxStore/slices/AddTicketData";
  import { add } from "../../reduxStore/slices/addConversation";
  import { io } from "socket.io-client";
  import { useSelector } from "react-redux";

  function ChatInput() {
    const [ticketBody, setTicketBody] = useState("");
    const [ticketRes, setTicketRes] = useState([]);
    const [ticketStatus, setTicketStatus] = useState("");
    const [newTicket, setNewTicket] = useState(false);
    const [addConversation, setAddConversation] = useState(false);
    const [message, setMessage] = useState([]);
    const fetch = useFetch();
    const dispatch = useDispatch();
    const socket = io("http://localhost:8081");
    const SelectedConversation = useSelector(
      (state) => state.showConversation
    ).slice(-1)[0];
    const newTicketBool = useSelector((state) => state.createNewTicket).slice(
      -1
    )[0];

    console.log("NewTicketBool", newTicketBool);

    const ticketData = {
      subject: "orem Ipsum is simply dummy text",
      description: ticketBody,
      requesterName: "rex",
      requesterEmail: "rex.doe@example.com",
      priority: "low",
      status: "open",
    };
    const replyData = {
      ticketId: SelectedConversation?.id || ticketRes.id,
      body: ticketBody,
      authorEmail: "rex.doe@example.com",
      authorId: SelectedConversation?.submitter_id || ticketRes.submitter_id,
      status: SelectedConversation?.status || ticketRes.status,
    };

    console.log("replyData", replyData);
    console.log("ticketData", ticketData);

    function createZendeskTicket(ticketData) {
      // console.log(ticketData);
      fetch("api/createZendeskTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      })
        .then((response) => response.json())
        .then((data) => {
          setTicketRes(data.result);
          setTicketStatus(data.result.status);
          dispatch(addTicketData(data));
        })
        .catch((error) => {
          console.error("Error creating Zendesk ticket:", error);
          alert(
            "An error occurred while creating the Zendesk ticket. Please try again later."
          );
        });
    }
    console.log("ticketRes", ticketRes);

    const SendReply = (replyData) => {
      if (replyData.ticketId) {
        fetch(`/api/tickets/${replyData.ticketId}/addConversation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(replyData),
        })
          .then((response) => response.json())
          .catch((error) => {
            console.error("Error sending reply:", error);
            alert(
              "An error occurred while sending the reply. Please try again later."
            );
          });
      }
    };
    useEffect(() => {
      if (newTicketBool) {
        setNewTicket(true)
      }
    }, [newTicketBool]);

    const handleTicket = () => {
      if (ticketBody !== "") {

        
        setAddConversation(!addConversation)
        
        if (newTicket) {
          socket.emit("conversation",{ticketData})
          createZendeskTicket(ticketData);
          setTicketBody("");
        setNewTicket(false)

        } else if (
          replyData.status === "open" ||
          replyData.status === "panding"
        ) {
          socket.emit("conversation",{replyData})
          SendReply(replyData);

          setTicketBody("");
        } else {
          socket.emit("conversation",{ticketData})
          createZendeskTicket(ticketData);
          setTicketBody("");
        }
      }
    };

    useEffect(()=>{
      socket.on('conversation',(payload)=>{
        setMessage([...message, payload])
      })
    })
    console.log('message',message);

    useEffect(() => {
      dispatch(add(addConversation))
    },[addConversation])
    
    // console.log("addConversation",addConversation)

    function handleKeyDown(event) {
      if (event.keyCode === 13) {
        handleTicket(event);
      }
    }

    return (
      <div className="chat-input">
        <input
          type="text"
          value={ticketBody}
          onChange={(e) => setTicketBody(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          className="message-input"
        />
        <button onClick={handleTicket} className="send-button" type="button">
          <BiSend size={20} color="red" />
        </button>
      </div>
    );
  }

  export default ChatInput;

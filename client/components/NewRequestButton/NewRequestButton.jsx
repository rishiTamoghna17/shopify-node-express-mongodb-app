import React,{useState,useEffect} from "react";
import { TiMessage } from "react-icons/ti";
import "./NewRequestButton.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add } from "../../reduxStore/slices/createNewTicket";
function NewRequestButton(props) {
  const [newTicket, setNewTicket] = useState(false)
  const dispatch = useDispatch();

  // const [ticketState, setTicketState] = useState({ id: "", ticket: {} });
  // const { id: ticketId, ticket } = ticketState;

  // const createdTicket = useSelector(state => state.ticketData).slice(-1)[0];
  // const setTickets = () => {
  //   setTicketState({ id: createdTicket?.result?.id, ticket: createdTicket?.result });
  // };

  // useEffect(() => {
  //   setTickets();
  // }, [createdTicket]);
// console.log("createdTicketfromrequestbutton",ticket);
  const handleNewTicket = () => {
    setNewTicket(true);
  console.log("cteate new ticket")
};
useEffect(() => {
  dispatch(add(newTicket))
},[newTicket])


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

import React from 'react'
import { TiMessage } from "react-icons/ti";
import './NewRequestButton.css'
function NewRequestButton(props) {
  return (
    <div className="conversation-footer-button-cls">
        <button type="button" className="refresh-button" >
          {<TiMessage color="white" size="30px"/>}start new request 
        </button>
        </div>
  )
}

export default NewRequestButton
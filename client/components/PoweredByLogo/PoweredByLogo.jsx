import React from 'react'
import './PoweredByLogo.css'
function PoweredByLogo(props) {
  return (
    <div className="chat-inputt">
    {" "}
    <h1 className="chat-input-powered-by">powered by</h1>
    <div className="chat-input-merchant-logo">{props.merchantLogo}</div>
  </div>
  )
}

export default PoweredByLogo
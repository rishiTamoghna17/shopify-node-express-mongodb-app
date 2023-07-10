import React from "react";
import "./Menu.css";
// import {BiMessageSquareDetails,BiMessageSquare} from "react-icons/bi"
import { TiMessage } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
function Menu(props) {
  return (
    <div className="menu-container" style={{ width: props.width }}>
      <div className="top-icons">
    
        <div className="merchant-logo">{props.merchantLogo}</div>
        <div className="merchant-icon">
          <TiMessage color="white" size="30px" />
        </div>
      </div>

      <div className="bottom-icons">

        <div className="settings-icon">
          <FiSettings color="white" size="30px" />
        </div>
        <div className="profile-pic">
          <CgProfile color="white" size="30px" />
        </div>

      </div>
    </div>
  );
}

export default Menu;

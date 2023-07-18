import React, { useState } from "react";
import "./Login.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import {AiOutlineMail} from "react-icons/ai";
import {BiSolidKey, BiLogInCircle} from "react-icons/bi";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModel, setShowModel] = useState(true);

  const closeModel = () => setShowModel(false);

  // useEffect(() => {
  //     document.body.style.overflow = "headen"
  //   return ()=>{
  //     document.body.style.overflowY = "scroll"
      
  //   }
  // },[])

  return ReactDOM.createPortal(
    showModel && (
      <>
        <div className="model-wrapper" >
          <div className="login-cross-btn" role="button" onClick={closeModel}>X</div>
        </div>
        <div className="model-container">
          <div className="login-container">
            <h2 className="login-title">LOGIN TO YOUR ACCOUNT</h2>
            <form className="login-form">
              <div className="input-wrapper">
                <input className="login-input" type="email" placeholder="Email" />
                <icon className="email-icon">
                  <AiOutlineMail color="white" />
                </icon>
              </div>
              <div className="input-wrapper">
                <input className="login-input" type="password" placeholder="Password" />
                <icon className="email-icon">
                  <BiSolidKey color="white" />
                </icon>
              </div>
              <div className="input-wrapper">
                <button className="login-btn-submit" type="submit">Login</button>
                <icon className="email-icon">
                  <BiLogInCircle color="black" />
                </icon>
              </div>
            </form>
            <div className="login-register-btn">
              <p>Not Yet Registered?</p>
              <p>
                <a href="#" className="register-btn-under-login">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </>
    ),
    document.querySelector(".log-in-div")
  );
}

export default Login;

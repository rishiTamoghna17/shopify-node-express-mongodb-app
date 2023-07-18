import { LegacyStack, Badge, Layout, Icon, Button } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { Session } from "@shopify/shopify-api";
import useFetch from "../../hooks/useFetch";
import { ProfileMajor } from "@shopify/polaris-icons";
import {MdOutlineExpandLess,MdOutlineExpandMore} from "react-icons/md";
import "./Navbar.css";
export default function Navbar(props) {
  const fetch = useFetch();
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const [expanded, setExpanded] = useState(false);

  async function fetchContentGQL(props) {
    setResponseDataGQL("loading...");
    const res = await fetch("/api/gql"); //fetch instance of useFetch()
    const response = await res.json();
    setResponseDataGQL(response.body.data.shop.name);
  }
  // const app = useAppBridge();
  // const redirect = Redirect.create(app);
  useEffect(() => {
    fetchContentGQL();
  }, []);
  // console.log("kjbfc", responseDataGQL);
  return (
    <div className="navbar">
      <h1 className="analytics">{props.title}</h1>
      <div className="right-content">
        <h1 className="organization">Organization:</h1>
        <div className="nav-bar-button-expand">
          <div
            className="button-storeName"
            // plain disclosure={} onClick={() => { setExpanded(!expanded); }}
          >
            {responseDataGQL}
          </div>
          <div className="nav-bar-expand-button" onClick={() =>  setExpanded(!expanded)}>
            {expanded ? <MdOutlineExpandMore size={20}/> : <MdOutlineExpandLess size={20}/>}
          </div>
        </div>
        <div className="profile-icon"></div>
      </div>
    </div>
  );
}

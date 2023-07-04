import { LegacyStack, Badge, Layout, Icon, Button } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { Session } from "@shopify/shopify-api";
import useFetch from "../../hooks/useFetch";
import { ProfileMajor } from "@shopify/polaris-icons";
import "./Navbar.css"
export default function Navbar() {
  const fetch = useFetch();
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const [expanded, setExpanded] = useState(false);

  async function fetchContentGQL() {
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
      <h1 className="analytics">Analytics</h1>
      <div className="right-content">
        <h1 className = "organization">Organization:</h1>
        <Button className="button-storeName" plain disclosure={expanded ? 'up' : 'down'} onClick={() => { setExpanded(!expanded); }}>
           {responseDataGQL}
        </Button>
        <div className="profile-icon" ></div>
      </div>
    </div>
  );
}

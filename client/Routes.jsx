import React from "react";

import ExitFrame from "./ExitFrame";
import ActiveWebhooks from "./pages/debugCards/ActiveWebhooks";
import BillingAPI from "./pages/debugCards/BillingAPI";
import DebugIndex from "./pages/debugCards/DebugIndex";
import DevNotes from "./pages/debugCards/DevNotes";
import GetData from "./pages/debugCards/GetData";
import Index from "./pages/Index";
import Ticket from "./pages/TicketsPage/ticketPage"
import Default from "./pages/DefaultPAge/default"

const routes = {
  "/": () => <Index />,
  "/tickets": () => <Ticket/>,
  "/exitframe": () => <ExitFrame />,
  "/exitframe/:shop": ({ shop }) => <ExitFrame shop={shop} />,
  //Debug Cards
  "/debug": () => <DebugIndex />,
  "/debug/activeWebhooks": () => <ActiveWebhooks />,
  "/debug/getData": () => <GetData />,
  "/debug/billing": () => <BillingAPI />,
  "/debug/devNotes": () => <DevNotes />,
  "/default": () => <Default />,
  //Add your routes here
};

export default routes;

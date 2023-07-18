import { Page } from '@shopify/polaris'
import React,{useState} from 'react'
import Ticket from '../../components/TIckerCountDashBoard/Ticket'
import Automation from '../../components/DashboardAutomation/Automation'
import Conversation from '../../components/Conversation/Conversation'
import "./ticketPage.css"
import Login from '../../components/LogIn/Login'
import Navbar from "../../components/Navbar/Navbar";

function ticket() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Page fullWidth>
      <div className="tickets-container">
      {isLogin ? <Login /> : null}
      {/* <Login /> */}
      <Navbar title="Tickets/conversations"/>
      <Ticket />
      <Automation SupportAutomationCard CreatedTicketsCard InProgressTicketsCard SolvedTicketsCard RoutedEscalatedTicketsCard/>
      <Conversation/>
      </div>
    </Page>
  )
}

export default ticket
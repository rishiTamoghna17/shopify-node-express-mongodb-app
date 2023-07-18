import { Page } from '@shopify/polaris'
import React,{useState} from 'react'
import Ticket from '../../components/TIckerCountDashBoard/Ticket'
import Automation from '../../components/DashboardAutomation/Automation'
import Conversation from '../../components/Conversation/Conversation'
import "./ticketPage.css"
import Login from '../../components/LogIn/Login'
function ticket() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Page fullWidth>
      <div>
      {isLogin ? <Login /> : null}
      {/* <Login /> */}
      <Ticket />
      <Automation SupportAutomationCard CreatedTicketsCard InProgressTicketsCard SolvedTicketsCard RoutedEscalatedTicketsCard/>
      <Conversation/>
      </div>
    </Page>
  )
}

export default ticket
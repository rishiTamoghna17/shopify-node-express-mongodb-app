import { Page } from '@shopify/polaris'
import React from 'react'
import Ticket from '../../components/TIckerCountDashBoard/Ticket'
import Automation from '../../components/DashboardAutomation/Automation'
import Conversation from '../../components/Conversation/Conversation'
import "./ticketPage.css"
function ticket() {
  return (
    <Page fullWidth>
      <Ticket />
      <Automation SupportAutomationCard CreatedTicketsCard InProgressTicketsCard SolvedTicketsCard RoutedEscalatedTicketsCard/>
      <Conversation/>
    </Page>
  )
}

export default ticket
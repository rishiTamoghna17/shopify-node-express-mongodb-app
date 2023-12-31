import { configureStore } from '@reduxjs/toolkit'
import ConversationSlice from './slices/conversation'
import  TicketData  from './slices/AddTicketData'
import  ShowConversationSlice  from './slices/showConversation'
import  CreateNewTicket  from './slices/createNewTicket'
import AddConversation from './slices/addConversation'

export const store = configureStore({
  reducer: {
    conversation:ConversationSlice,
    ticketData:TicketData,
    showConversation:ShowConversationSlice,
    createNewTicket:CreateNewTicket,
    addConversation:AddConversation
  }
})
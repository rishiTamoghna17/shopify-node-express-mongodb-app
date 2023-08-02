import { configureStore } from '@reduxjs/toolkit'
import ConversationSlice from './slices/conversation'
import  TicketData  from './slices/AddTicketData'
export const store = configureStore({
  reducer: {
    conversation:ConversationSlice,
    ticketData:TicketData
  }
})
import { configureStore } from '@reduxjs/toolkit'
import ConversationSlice from './slices/conversation'
export const store = configureStore({
  reducer: {
    cenversation:ConversationSlice
  },
})
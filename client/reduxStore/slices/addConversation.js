import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const addConversationSlice = createSlice({
  name: "addConversation",
  initialState,
  reducers: {

    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { add } =
addConversationSlice.actions;

export default addConversationSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const showConversationSlice = createSlice({
  name: "showConversationSlice",
  initialState,
  reducers: {

    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { add } =
showConversationSlice.actions;

export default showConversationSlice.reducer;
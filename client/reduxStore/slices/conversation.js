import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {

    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { add } =
  conversationSlice.actions;

export default conversationSlice.reducer;

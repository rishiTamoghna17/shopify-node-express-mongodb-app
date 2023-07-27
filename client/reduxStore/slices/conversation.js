import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { increment, decrement, add } =
  conversationSlice.actions;

export default conversationSlice.reducer;

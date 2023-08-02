import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ticketDataSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicketData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTicketData } =
  ticketDataSlice.actions;

export default ticketDataSlice.reducer;
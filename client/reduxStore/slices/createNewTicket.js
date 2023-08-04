import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const newTicketSlice = createSlice({
  name: "newTicket",
  initialState,
  reducers: {

    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { add } =
newTicketSlice.actions;

export default newTicketSlice.reducer;
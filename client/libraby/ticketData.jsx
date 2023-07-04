import React from "react";
import useFetch from "../hooks/useFetch";

export default async function fetchTicketContent() {
  const fetch = useFetch();
  setTicket("loading...");
  const res = await fetch("/api/tickets");
  const response = await res.json();
}

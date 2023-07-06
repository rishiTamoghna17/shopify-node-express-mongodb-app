import React, { useState } from "react";
import { dummyTicket } from "../../assets/dummydata.js";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
  BiSolidSortAlt,
} from "react-icons/bi";
import { LiaSortSolid } from "react-icons/lia";
import "./Conversation.css";

function Conversation() {
  const [sortColumn, setSortColumn] = useState("");
  const [ticket, setTicket] = useState(dummyTicket);
  const [sortOrder, setSortOrder] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(15);
const [displayedItems, setDisplayedItems] = useState(itemsPerPage);

  //sorting logic
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  //data sorting
  const sortedTicket = ticket.sort((a, b) => {
    if (sortColumn === "Customer") {
      return sortOrder === "asc"
        ? a.customer.localeCompare(b.customer)
        : b.customer.localeCompare(a.customer);
    } else if (sortColumn === "Email") {
      return sortOrder === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (sortColumn === "Ticket ID") {
      return sortOrder === "asc"
        ? a.ticketId - b.ticketId
        : b.ticketId - a.ticketId;
    } else if (sortColumn === "Request Type") {
      return sortOrder === "asc"
        ? a.requestType.localeCompare(b.requestType)
        : b.requestType.localeCompare(a.requestType);
    } else if (sortColumn === "Requested Date") {
      return sortOrder === "asc"
        ? new Date(a.requestedDate) - new Date(b.requestedDate)
        : new Date(b.requestedDate) - new Date(a.requestedDate);
    } else if (sortColumn === "Priority") {
      return sortOrder === "asc"
        ? a.priority.localeCompare(b.priority)
        : b.priority.localeCompare(a.priority);
    } else if (sortColumn === "Status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortColumn === "Channel") {
      return sortOrder === "asc"
        ? a.channel.localeCompare(b.channel)
        : b.channel.localeCompare(a.channel);
    } else if (sortColumn === "Total Orders") {
      return sortOrder === "asc"
        ? a.totalOrders - b.totalOrders
        : b.totalOrders - a.totalOrders;
    }
    return 0;
  });
  //handle pagination
  const handleLoadMore = () => {
    setDisplayedItems((prevDisplayedItems) => prevDisplayedItems + itemsPerPage);
  };
  

  return (
    <div className="conversation-start">
      <div className="conversation-heading">
        <h1 className="conversation-heading-title">Conversation</h1>
        <div className="conversation-filters">
          {/* Search bar */}
          <h1 className="conversation-filters-title">
            showing result 15 of {ticket.length}
          </h1>
          <input type="text" placeholder="Search " />

          {/* Status filter */}
          <select>
            <option value="">All Status</option>
            <option value="completed">Close/Completed</option>
            <option value="inProgress">In-progress</option>
            <option value="routedPending">Route/Pending</option>
            <option value="routedInProgress">Route/In-progress</option>
          </select>

          {/* Type filter */}
          <select>
            <option value="">All Types</option>
            <option value="orderStatus">Order Status</option>
            <option value="productSuggestions">Product Suggestions</option>
            <option value="articles">Articles/FAQ/Help Center</option>
          </select>

          {/* Sort by filter */}
          <select>
            <option value="">Sort by</option>
            <option value="requestedDateAsc">Requested Date </option>
            <option value="customerNameAsc">Customer Name </option>
            <option value="totalOrdersDesc">Total Orders </option>
          </select>
        </div>
      </div>

      {/* Conversation line items */}
      <div className="table-card">
        <table className="conversation-line-items-table">
          <thead>
            <tr className="conversation-line-item-header">
              <th>
                Customer
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Customer")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Email
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Email")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Ticket ID
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Ticket ID")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Request Type
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Request Type")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Requested Date
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Requested Date")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Priority
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Priority")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Status
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Status")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Channel
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Channel")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
              <th>
                Total Orders
                <span
                  className="sort-arrow"
                  onClick={() => handleSort("Total Orders")}
                >
                  <BiSolidSortAlt
                    color="white"
                    style={{
                      fontSize: "10px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTicket.slice(0, displayedItems).map((conversation) => (
              <tr
                className="conversation-line-table-body-item-card"
                key={conversation.ticketId}
              >
                <td className="conversation-line-table-body-item">
                  {conversation.customer}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.email}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.ticketId}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.requestType}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.requestedDate}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.priority}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.status}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.channel}
                </td>
                <td className="conversation-line-table-body-item">
                  {conversation.totalOrders}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="conversation-line-items-table-pagination-load-more-button">
          <button className="load-more-button" onClick={handleLoadMore} disabled={displayedItems >= sortedTicket.length}>LOAD MORE</button>
        </div>
      </div>

      {/* Load more button */}
    </div>
  );
}

export default Conversation;

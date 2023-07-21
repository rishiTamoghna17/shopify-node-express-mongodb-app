import React, { useState } from "react";
import { dummyTicket } from "../../assets/dummydata.js";
import { BiSolidSortAlt, BiSearch } from "react-icons/bi";
import {
  AiOutlineCheckCircle,
  AiOutlineSync,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { MdOutlineSort } from "react-icons/md";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import "./Conversation.css";

function Conversation() {
  const [sortColumn, setSortColumn] = useState("");
  const [ticket, setTicket] = useState(dummyTicket);
  const [sortOrder, setSortOrder] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

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
    setDisplayedItems((prevDisplayedItems) => {
      if (ticket.length > prevDisplayedItems) {
        return ticket.length - (prevDisplayedItems + itemsPerPage) > 0
          ? prevDisplayedItems + itemsPerPage
          : ticket.length;
      } else {
        return itemsPerPage;
      }
    }); // to set table ending point

    setCurrentPage((prevDisplayedItems) => {
      if (ticket.length - itemsPerPage >= prevDisplayedItems) {
        return prevDisplayedItems + itemsPerPage;
      } else {
        return 0;
      }
    }); //to set table starting point
  };

  //get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Close/Completed":
        return <AiOutlineCheckCircle color="green" />;
      case "Route/In-progress":
      case "Route/Pending":
        return <AiOutlineSync color="red" />;
      case "In-progress":
        return <BsClockHistory color="blue" />;
      default:
        return null;
    }
  };

  return (
    <div className="conversation-start">
      <div className="conversation-heading">
        <h1 className="conversation-heading-title">Conversation</h1>
        <div className="conversation-filters">
          {/* Search bar */}
          <h1 className="conversation-filters-title">
            showing result{" "}
            {displayedItems < ticket.length ? displayedItems : ticket.length} of{" "}
            {ticket.length}
          </h1>
          <div className="conversation-filters-search-bar">
            <i>
              <BiSearch size={15} color="white" />
            </i>
            <input type="text" placeholder="Search " />
          </div>

          {/* Status filter */}
          <div className="conversation-filters-status-bar">
            <i>
              <AiOutlineInfoCircle size={15} color="white" />
            </i>
            <select>
              <option
                className="conversation-filters-status-bar-option"
                value=""
              >
                All Status
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="completed"
              >
                Close/Completed
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="inProgress"
              >
                In-progress
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="routedPending"
              >
                Route/Pending
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="routedInProgress"
              >
                Route/In-progress
              </option>
            </select>
          </div>

          {/* Type filter */}
          <div className="conversation-filters-status-bar">
            <i>
              <RiCheckboxMultipleLine size={15} color="white" />
            </i>
            <select>
              <option
                className="conversation-filters-status-bar-option"
                value=""
              >
                All Types
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="orderStatus"
              >
                Order Status
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="productSuggestions"
              >
                Product Suggestions
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="articles"
              >
                Articles/FAQ/Help Center
              </option>
            </select>
          </div>

          {/* Sort by filter */}
          <div className="conversation-filters-status-bar">
            <i>
              <MdOutlineSort size={15} color="white" />
            </i>
            <select>
              <option
                className="conversation-filters-status-bar-option"
                value=""
              >
                Sort by
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="requestedDateAsc"
              >
                Requested Date{" "}
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="customerNameAsc"
              >
                Customer Name{" "}
              </option>
              <option
                className="conversation-filters-status-bar-option"
                value="totalOrdersDesc"
              >
                Total Orders{" "}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Conversation line items */}
      <div className="table-card">
        <div className="conversation-line-items-table-div">
          <table className="conversation-line-items-table">
            <thead>
              <tr className="conversation-line-item-header">
                <th className="conversarion-line-item-th">
                  Customer
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Customer")}
                  >
                    <BiSolidSortAlt className="sort-icon" color="white" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Email
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Email")}
                  >
                    <BiSolidSortAlt className="sort-icon" color="white" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Ticket ID
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Ticket ID")}
                  >
                    <BiSolidSortAlt color="white" className="sort-icon" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Request Type
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Request Type")}
                  >
                    <BiSolidSortAlt color="white" className="sort-icon" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Requested Date
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Requested Date")}
                  >
                    <BiSolidSortAlt color="white" className="sort-icon" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Priority
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Priority")}
                  >
                    <BiSolidSortAlt color="white" className="sort-icon" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Status
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Status")}
                  >
                    <BiSolidSortAlt color="white" className="sort-icon" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Channel
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Channel")}
                  >
                    <BiSolidSortAlt color="white" className="sort-icon" />
                  </span>
                </th>
                <th className="conversarion-line-item-th">
                  Total Orders
                  <span
                    className="sort-arrow"
                    onClick={() => handleSort("Total Orders")}
                  >
                    <BiSolidSortAlt color="white" className="sort-icon" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTicket
                .slice(currentPage, displayedItems)
                .map((conversation) => (
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
                      {getStatusIcon(conversation.status)}
                      {"   "}
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
        </div>
        <div className="conversation-line-items-table-pagination-load-more-button">
          <button
            className="load-more-button"
            onClick={handleLoadMore}
            // disabled={displayedItems >= sortedTicket.length}
          >
            LOAD MORE
          </button>
        </div>
      </div>

      {/* Load more button */}
    </div>
  );
}

export default Conversation;

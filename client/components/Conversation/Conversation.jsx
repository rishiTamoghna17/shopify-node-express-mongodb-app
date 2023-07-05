import React,{useState} from "react";
import {dummyTicket} from "../../assets/dummydata.js"; 
import {AiOutlineSearch} from "react-icons/ai";
import {AiOutlineMail} from "react-icons/ai";
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import "./Conversation.css";



function Conversation() {
    const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('');
  const handleSort = (field) => {
    if (sortField === field) {
      // If the same field is clicked again, reverse the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a new field is clicked, set the sort field and order
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = dummyTicket.sort((a, b) => {
    // Sort the data based on the sortField and sortOrder
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  return (
    <div className="conversation-start">
      <div className="conversation-heading">
        <h1 className="conversation-heading-title">Conversation</h1>
        <div className="conversation-filters">
          {/* Search bar */}
          <h1 className="conversation-filters-title">
            showing result 15 of 4114
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
            <option value="requestedDateAsc">Requested Date (Asc)</option>
            <option value="requestedDateDesc">Requested Date (Desc)</option>
            <option value="customerNameAsc">Customer Name (Asc)</option>
            <option value="customerNameDesc">Customer Name (Desc)</option>
            <option value="totalOrdersAsc">Total Orders (Asc)</option>
            <option value="totalOrdersDesc">Total Orders (Desc)</option>
          </select>
        </div>
      </div>

      {/* Conversation line items */}
      <table className="conversation-line-items">
      <thead>
        <tr className="conversation-line-item-header">
          <th onClick={() => handleSort('customer')}>
            Customer{' '}
            {sortField === 'customer' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('email')}>
            Email{' '}
            {sortField === 'email' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('ticketId')}>
            Ticket ID{' '}
            {sortField === 'ticketId' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('requestType')}>
            Request Type{' '}
            {sortField === 'requestType' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('requestedDate')}>
            Requested Date{' '}
            {sortField === 'requestedDate' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('priority')}>
            Priority{' '}
            {sortField === 'priority' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('status')}>
            Status{' '}
            {sortField === 'status' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('channel')}>
            Channel{' '}
            {sortField === 'channel' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
          <th onClick={() => handleSort('totalOrders')}>
            Total Orders{' '}
            {sortField === 'totalOrders' && (
              <span>{sortOrder === 'asc' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</span>
            )}
          </th>
        </tr>
      </thead>
        <tbody>
          {dummyTicket.map((conversation) => (
            <tr key={conversation.ticketId}>
              <td>{conversation.customer}</td>
              <td>{conversation.email}</td>
              <td>{conversation.ticketId}</td>
              <td>{conversation.requestType}</td>
              <td>{conversation.requestedDate}</td>
              <td>{conversation.priority}</td>
              <td>{conversation.status}</td>
              <td>{conversation.channel}</td>
              <td>{conversation.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load more button */}
      <button className="load-more-button">LOAD MORE</button>
    </div>
  );
}

export default Conversation;

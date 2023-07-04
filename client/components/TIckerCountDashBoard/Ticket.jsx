import React, { useEffect, useState } from "react";
import "./Ticket.css";
import Chart from "react-apexcharts";
import useFetch from "../../hooks/useFetch";

const dummyTicketData = [
  // Replace this with your actual dummy data for tickets
  // Dummy data should contain objects with 'date' and 'count' properties
  { date: "2023-06-15", count: 10 },
  { date: "2023-06-16", count: 15 },
  { date: "2023-06-17", count: 20 },
  { date: "2023-06-18", count: 10 },
  { date: "2023-06-19", count: 15 },
  { date: "2023-06-20", count: 25 },
  // Add more data as needed
];

function Ticket() {
  const [ticket, setTicket] = useState([]);
  const fetch = useFetch();
  const [chartData, setChartData] = useState({
    options: {
      stroke: {
        curve: "straight",
        width: 2,
      },
      colors: ["#F44336"],
      chart: {
        id: "ticket-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [], // Empty array initially
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
        show: false,
      },
      tooltip: {
        enabled: false,
        show: false,
      },
    },
    series: [
      {
        name: "Ticket Count",
        data: [], // Empty array initially
      },
    ],
  });

  const [selectedAutomationType, setSelectedAutomationType] = useState("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState("last30days");

  // Fetch ticket data based on filters
  async function fetchContent() {
    setTicket("loading...");
    const res = await fetch("/api/tickets");
    const response = await res.json();
    if (response.error) {
      setTicket([]);
    } else {
      setTicket(response);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  // Calculate total ticket count
  const totalTicketCount = ticket.length;

  // Update chart data based on selected filters
  function updateChartData() {
    let filteredData = [...dummyTicketData];

    // Filter by automation type
    if (selectedAutomationType !== "all") {
      filteredData = filteredData.filter(
        (item) => item.type === selectedAutomationType
      );
    }

    // Filter by date range
    switch (selectedDateFilter) {
      case "last90days":
        // Implement filtering for last 90 days
        break;
      case "last60days":
        // Implement filtering for last 60 days
        break;
      case "last30days":
        // Implement filtering for last 30 days
        break;
      case "last15days":
        // Implement filtering for last 15 days
        break;
      case "lastweek":
        // Implement filtering for last week
        break;
      case "custom":
        // Implement filtering for custom date range
        break;
      default:
        break;
    }

    // Update chartData.series and chartData.options.xaxis.categories accordingly
    const categories = filteredData.map((item) => item.date);
    const data = filteredData.map((item) => item.count);

    setChartData((prevChartData) => ({
      ...prevChartData,
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          categories,
        },
      },
      series: [
        {
          ...prevChartData.series[0],
          data,
        },
      ],
    }));
  }

  // Call updateChartData whenever the filters change
  useEffect(() => {
    updateChartData();
  }, [selectedAutomationType, selectedDateFilter]);

  return (
    <div className="ticket-count-dashboard">
      <div className="ticket-count-allignment">
        <div className="ticket-count-heading">
          <h1>Total Tickets</h1> <br />{" "}
          <span className="total-ticket-count">{totalTicketCount}</span>
        </div>
        <div className="ticket-filters">
          {/* Implement automation type filter */}
          <select
            value={selectedAutomationType}
            onChange={(e) => setSelectedAutomationType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="email">Email </option>
            <option value="frontend">Frontend </option>
          </select>
          {/* Implement date filter */}
          <select
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
          >
            <option value="last90days">Last 90 Days</option>
            <option value="last60days">Last 60 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last15days">Last 15 Days</option>
            <option value="lastweek">Last Week</option>
            <option value="custom">Custom Date Range</option>
          </select>
        </div>
      </div>
      <div className="ticket-graph">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={300}
        />
      </div>
    </div>
  );
}

export default Ticket;

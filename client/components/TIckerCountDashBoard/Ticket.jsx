import React, { useEffect, useState } from "react";
import "./Ticket.css";
import Chart from "react-apexcharts";
import useFetch from "../../hooks/useFetch";
import { AiOutlineMail } from "react-icons/ai";

function Ticket({ graph }) {
  const [selectedAutomationType, setSelectedAutomationType] = useState("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState("last30days");
  const [ticket, setTicket] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
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
          show: true,
        },
        axisTicks: {
          show: false,
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
        enabled: true,
        show: true,
        custom: function ({ series, seriesIndex, dataPointIndex }) {
          return `<div class="custom-tooltip">${series[seriesIndex][dataPointIndex]}</div>`;
        },
      },
    },
    series: [
      {
        name: "Ticket Count",
        data: [], // Empty array initially
      },
    ],
  });

  async function fetchContent() {
    setTicket("loading...");
    const res = await fetch("/api/tickets");
    const response = await res.json();
    console.log(response);
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
    let filteredData = [...ticket];

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
        const last90Days = new Date();
        last90Days.setDate(last90Days.getDate() - 90);
        filteredData = filteredData.filter(
          (item) => new Date(item.created_at) >= last90Days
        );
        break;
      case "last60days":
        // Implement filtering for last 60 days
        const last60Days = new Date();
        last60Days.setDate(last60Days.getDate() - 60);
        filteredData = filteredData.filter(
          (item) => new Date(item.created_at) >= last60Days
        );
        break;
      case "last30days":
        // Implement filtering for last 30 days
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        filteredData = filteredData.filter(
          (item) => new Date(item.created_at) >= last30Days
        );
        break;
      case "last15days":
        // Implement filtering for last 15 days
        const last15Days = new Date();
        last15Days.setDate(last15Days.getDate() - 15);
        filteredData = filteredData.filter(
          (item) => new Date(item.created_at) >= last15Days
        );
        break;
      case "lastweek":
        // Implement filtering for last week
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        filteredData = filteredData.filter(
          (item) => new Date(item.created_at) >= lastWeek
        );
        break;
      case "custom":
        // Implement filtering for custom date range
        // Replace 'startDate' and 'endDate' with actual custom date range values
        const startDate = new Date("2023-07-01");
        const endDate = new Date("2023-07-28");
        filteredData = filteredData.filter(
          (item) =>
            new Date(item.created_at) >= startDate &&
            new Date(item.created_at) <= endDate
        );
        break;
      default:
        break;
    }

    const ticketCountByDate = {};
    filteredData.forEach((item) => {
      const date = item.created_at.split("T")[0]; // Extract date part from "created_at"

      if (ticketCountByDate[date]) {
        ticketCountByDate[date] += 1; // Increment ticket count for the date
      } else {
        ticketCountByDate[date] = 1; // Initialize ticket count for the date
      }
    });

    // Extract the dates (categories) and ticket counts (data) from the object

    setCategories(Object.keys(ticketCountByDate));
    setData(Object.values(ticketCountByDate));

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

  console.log("categories", categories);
  console.log("data", data);

  return (
    <div className="ticket-count-dashboard">
      {/* Show loading message while data is being fetched */}
      {ticket === "loading..." ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="ticket-count-allignment">
            <div className="ticket-count-heading">
              <h1>Total Tickets</h1> <br />
              <span className="total-ticket-count">{totalTicketCount}</span>
            </div>
            <div className="ticket-filters">
              {/* Implement automation type filter */}
              <select
                value={selectedAutomationType}
                onChange={(e) => setSelectedAutomationType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="email">Email</option>
                <option value="frontend">Frontend</option>
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
          <div className={graph ? "ticket-graph" : "ticket-disabled"}>
            {categories?.length === 0 || data?.length === 0 ? (
              <div>No data available</div>
            ) : (
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={150}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Ticket;

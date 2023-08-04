import React, { useEffect, useState, useMemo } from "react";
import "./Ticket.css";
import Chart from "react-apexcharts";
import useFetch from "../../hooks/useFetch";
import { DatePicker } from "antd";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { add } from "../../reduxStore/slices/conversation.js";
import { useSelector } from "react-redux";

function Ticket({ graph }) {
  const [selectedAutomationType, setSelectedAutomationType] = useState("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState("last30days");
  const [ticket, setTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useFetch();
  const dispatch = useDispatch();
  

  const getInitialChartData = () => ({
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

  const [chartData, setChartData] = useState(getInitialChartData());
  const createdTicket = useSelector((state) => state.ticketData).slice(-1)[0];
  async function fetchData() {
    setIsLoading(true);
    const res = await fetch("/api/tickets");
    const response = await res.json();
    console.log(response);
    if (response.error) {
      setTicket([]);
    } else {
      setTicket(response);
      dispatch(add(response));
      updateChartData(
        response.filter((item) => filterByDateRange(item, selectedDateFilter))
      );
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [createdTicket]);

  const totalTicketCount = useMemo(() => ticket.length, [ticket]);

  function calculateTicketCountByDate(filteredData) {
    const ticketCountByDate = {};
    filteredData.forEach((item) => {
      const date = item.created_at.split("T")[0]; // Extract date part from "created_at"

      if (ticketCountByDate[date]) {
        ticketCountByDate[date] += 1; // Increment ticket count for the date
      } else {
        ticketCountByDate[date] = 1; // Initialize ticket count for the date
      }
    });

    return ticketCountByDate;
  }

  function extractCategories(ticketCountByDate) {
    return Object.keys(ticketCountByDate);
  }

  function extractData(ticketCountByDate) {
    return Object.values(ticketCountByDate);
  }

  const filteredData = ticket.filter((item) =>
    filterByDateRange(item, selectedDateFilter)
  );
  const ticketCountByDate = calculateTicketCountByDate(filteredData);
  const categories = extractCategories(ticketCountByDate);
  const data = extractData(ticketCountByDate);

  useEffect(() => {
    updateChartData(filteredData);
  }, [selectedAutomationType, selectedDateFilter]);

  function filterByDateRange(item, selectedDateFilter) {
    const dateFilters = {
      last90days: 90,
      last60days: 60,
      last30days: 30,
      last15days: 15,
      lastweek: 7,
    };
    const days = dateFilters[selectedDateFilter];
    if (!days) {
      return true;
    }
    const date = new Date();
    date.setDate(date.getDate() - days);
    return new Date(item.created_at) >= date;
  }

  function filterByCustomDateRange(item, startDate, endDate) {
    const date = new Date(item.created_at);
    return date >= new Date(startDate) && date <= new Date(endDate);
  }

  function updateChartData(filteredData) {
    const ticketCountByDate = calculateTicketCountByDate(filteredData);
    const categories = extractCategories(ticketCountByDate);
    const data = extractData(ticketCountByDate);

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
  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0].toISOString();
      const endDate = dates[1].toISOString();
      const filteredData = ticket.filter((item) =>
        filterByCustomDateRange(item, startDate, endDate)
      );
      updateChartData(filteredData);
    }
  };

  console.log("categories", categories);
  console.log("data", data);

  return (
    <div className="ticket-count-dashboard">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="ticket-count-allignment">
            <div className="ticket-count-heading">
              <h1>Total Tickets</h1> <br />
              <span className="total-ticket-count">{totalTicketCount}</span>
            </div>
            <div className="ticket-filters">
              <select
                value={selectedAutomationType}
                onChange={(e) => setSelectedAutomationType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="email">Email</option>
                <option value="frontend">Frontend</option>
              </select>
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
              {/* New section to input custom date range using Ant Design RangePicker */}
              {selectedDateFilter === "custom" && (
                <div className="custom-date-range">
                  <DatePicker.RangePicker onChange={handleDateRangeChange} />
                </div>
              )}
            </div>
          </div>

          <div className={graph ? "ticket-graph" : "ticket-disabled"}>
            {categories.length === 0 || data.length === 0 ? (
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

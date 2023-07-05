import React, { useEffect, useState } from "react";
import { Session } from "@shopify/shopify-api";
import useFetch from "../../hooks/useFetch";
import { ProfileMajor } from "@shopify/polaris-icons";
import "./Automation.css";
import Chart from "react-apexcharts";
import { BiMessage, BiSolidCircleQuarter, BiDollar } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import {
  LiaUnlockAltSolid,
  LiaLockSolid,
  LiaPlusSquareSolid,
  LiaPercentageSolid,
} from "react-icons/lia";
import { MdRoute } from "react-icons/md";
import { LuArrowDownRight } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";

function Automation(props) {
  const [ticket, setTicket] = useState([]);
  const fetch = useFetch();
  //ticket call
  async function fetchContent() {
    setTicket("loading...");
    const res = await fetch("/api/tickets");
    const response = await res.json();
    if (response.error) {
      setTicket(data.error);
    } else {
      setTicket(response);
    }
  }
  useEffect(() => {
    fetchContent();
  }, []);

    const calculatePercentage = (value, threshold) => {
    return value > 0 ? (
      <MdArrowOutward color="green" size="15px" />
    ) : (
      <LuArrowDownRight color="red" size="15px" />
    );
  };

  const Card = ({ title, value, icon, percentage, threshold }) => {
    return (
      <div className="card">
        {<h3>{title}</h3>}
        <div className="card-content">
          <div className="card-content-value">{value}</div>
          <div className="icon">{icon}</div>
        </div>
        <div className="card-percentile">
          <div className="percentage-icon">
            {calculatePercentage(percentage, threshold)}
          </div>
          <div className="percentage-value">{percentage}%</div>
        </div>
      </div>
    );
  };

  const SupportAutomationCard = () => {
    if (ticket === "loading...") {
      return <div>Loading...</div>;
    }
    // Calculate the number of automation tickets
    const automationTickets = ticket.filter(
      (ticket) => ticket.support === "Automation"
    );
    const automationCount = automationTickets.length;

    // Calculate the percentage
    const totalTickets = ticket.length;
    const automationPercentage = ((automationCount / totalTickets) * 100).toFixed(2);

    const support_Automation = 19;

    return (
      <Card
      title="Support Automation (100%)"
      value={`${automationPercentage} %`}
      icon={<BiMessage color="blue" size="25px" />}
      percentage={support_Automation}
      threshold={0}
    />
    );
  };

  const HumanHoursSavedCard = () => {
    const hoursSaved = 120; // Example value
    const human_hours = 10;

    return (
      <Card
      title="Human Hours Saved"
      value={`${hoursSaved} `}
      icon={<FaRegClock color="yellow" size="25px" />}
      percentage={human_hours}
      threshold={0}
    />
    );
  };

  const CSATScoreCard = () => {
    const csatScore = 90; // Example value
    const CSAT_Score = 100;

    return (

      <Card
      title="CSAT Score"
      value={`${csatScore} %`}
      icon={<BiSolidCircleQuarter color="red" size="25px" />}
      percentage={CSAT_Score}
      threshold={0}
    />

    );
  };

  const CostSavedWithAutomationCard = () => {
    const costSaved = 500; // Example value
    const cost_saved = 100;

    return (
      <Card
      title="Cost Saved with Automation"
      value={`$ ${costSaved} `}
      icon={<AiOutlineDollarCircle color="blue" size="25px" />}
      percentage={cost_saved}
      threshold={cost_saved}
    />
    );
  };

  const AverageRequestDurationCard = () => {
    const averageDuration = 15; // Example value
    const avarage_duration = -1.07;
    return (
      <Card
      title="Average Request Duration"
      value={`${averageDuration}`}
      icon={<FiClock color="orange" size="25px" />}
      percentage={avarage_duration}
      threshold={0}
    />
    );
  };

  const CreatedTicketsCard = () => {
    const createdTickets = ticket.length;
    const create_ticket = 50;

    return (

      <Card
      title="Created Tickets"
      value={`${createdTickets}`}
      icon={ <LiaPlusSquareSolid color="orange" size="25px" />}
      percentage={create_ticket}
      threshold={0}
    />
    );
  };

  const InProgressTicketsCard = () => {
    const progress_ticket = -50;

    if (ticket === "loading...") {
      return <div>Loading...</div>;
    }
    const inProgressTickets = ticket.filter((t) => t.isComplete === false);

    return (
      <Card
      title="In Progress Tickets"
      value={`${inProgressTickets.length}`}
      icon={<LiaUnlockAltSolid color="violet" size="25px" />}
      percentage={progress_ticket}
      threshold={0}
    />
    );
  };

  const SolvedTicketsCard = () => {
    const save_ticket = 74;

    if (ticket === "loading...") {
      return <div>Loading...</div>;
    }
    const solvedTickets = ticket.filter((t) => t.isComplete === true);

    return (
      <Card
      title="Solved/close Tickets"
      value={`${solvedTickets.length}`}
      icon={<LiaLockSolid color="blue" size="25px" />}
      percentage={save_ticket}
      threshold={0}
    />
    );
  };

  const RoutedEscalatedTicketsCard = () => {
    const routed_ticket = 49;

    if (ticket === "loading...") {
      return <div>Loading...</div>;
    }
    const routedEscalatedTickets = ticket.filter((t) => t.support === "Human");
    return (
      <Card
      title="Routed/Escalated Tickets"
      value={`${routedEscalatedTickets.length}`}
      icon={<MdRoute
                color="green"
                size="25px"
                style={{ transform: "rotate(90deg)" }}
              />}
      percentage={routed_ticket}
      threshold={0}
    />
    );
  };

  const GeneratedRevenueCard = () => {
    const generatedRevenue = 1000; // Example value
    const Generated_Revenue = -10;

    return (

      <Card
      title="Generated Revenue"
      value={`${generatedRevenue}`}
      icon={<LiaPercentageSolid color="violet" size="25px" />}
      percentage={Generated_Revenue}
      threshold={0}
    />
    );
  };

  const CurrentAutomationQueueCard = () => {
    const [currentQueue, setCurrentQueue] = useState(5);
    const current_automation = 10;

    const [chartData, setChartData] = useState({
      options: {
        stroke: {
          curve: "straight",
          width: 2,
        },
        colors: ["#F44336", "#E91E63", "#9C27B0"],
        chart: {
          id: "queue-chart",
          toolbar: {
            show: false, // Hide the toolbar/navbar
          },
        },
        xaxis: {
          categories: [
            "0-3",
            "3-6",
            "6-9",
            "9-12",
            "12-15",
            "15-18",
            "18-21",
            "21-24",
          ], // Hours
          labels: {
            show: false, // Hide x-axis labels
          },
          axisBorder: {
            show: false, // Hide x-axis border line
          },
          axisTicks: {
            show: false, // Hide x-axis ticks
          },
        },
        yaxis: {
          labels: {
            show: false, // Hide y-axis labels
          },
          axisBorder: {
            show: false, // Hide y-axis border line
          },
        },
        grid: {
          show: false, // Hide the background grid lines
        },
        dataLabels: {
          enabled: false, // Hide data numbers
          show: false,
        },
        tooltip: {
          enabled: false, // Hide tooltip
          
        },
      },
      series: [
        {
          name: "Automation Count",
          data: [8, 12, 6, 10, 15, 7, 9, 11], // Example automation count for each hour
        },
      ],
    });

    return (
      <div className="Automation-card">
        <h3>Current Automation Queue</h3>
        <div className="queue-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={200}
          />
        </div>
        <div className="card-content">
          <div className="card-percentile">
            <div className="percentage-icon">
              {current_automation > 0 ? (
                <MdArrowOutward color="green" size="15px" />
              ) : (
                <LuArrowDownRight color="red" size="15px" />
              )}
            </div>
            <div className="percentage-value">{current_automation}%</div>
          </div>
          <div className="automation-icon-queue">
          <div className="automation-icon">live</div>
          <div className="automation-queue">{currentQueue}</div>
          </div>
        </div>
      </div>
    );
  };

  const MostSupportRequestHoursCard = () => {
    const [chartData, setChartData] = useState({
      options: {
        stroke: {
          curve: "straight",
          width: 2,
        },
        colors: ["#F44336", "#E91E63", "#9C27B0"],
        chart: {
          id: "most-requested-hours-chart",
          toolbar: {
            show: false, // Hide the toolbar/navbar
          },
        },  
        xaxis: {
          categories: [
            "1AM",
            "4AM",
            "7AM",
            "10AM",
            "1PM",
            "4PM",
            "7PM",
            "10PM",
            "12PM",
          ],
          labels: {
            show: true, // Show x-axis labels
          },
          axisBorder: {
            show: true, // set false to Hide x-axis border line
          },
          axisTicks: {
            show: false, // Hide x-axis ticks
          },
        },
        yaxis: {
          labels: {
            show: false, // Hide y-axis labels
          },
          axisBorder: {
            show: false, // Hide y-axis border line
          },
        },
        grid: {
          show: false, // Hide the background grid lines
        },
        dataLabels: {
          enabled: false, // Show data numbers
        },
        tooltip: {
          enabled: true, // Show tooltip
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const value = series[seriesIndex][dataPointIndex];
          return `<div class="custom-tooltip">${value}</div>`;;
          },
        },
      },
      series: [
        {
          name: "Most Requested Hours",
          data: [10, 8, 12, 9, 15, 11, 14, 7, 13], // Example data for each hour
        },
      ],
    });

    return (
      <div className="Hours-card">
        <h3>Most Requested Hours</h3>
        <div className="hours-chart">
          <Chart
            className="chart-most-requested-hours"
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={200}
          />
        </div>
      </div>
    );
  };

    const TopSupportRequestCategoriesCard = () => {
      const [selectedFilters, setSelectedFilters] = useState([]);
      const [chartData, setChartData] = useState({
        options: {
          stroke: {
            curve: "straight",
            width: 2,
          },
          colors: ["#F44336", "#808080"],
          chart: {
            id: "top-categories-chart",
            toolbar: {
              show: false, // Hide the toolbar/navbar
            },
          },
          xaxis: {
            categories: [], // Categories will be dynamically populated
            labels: {
              show: true, // Show x-axis labels
            },
            axisBorder: {
              show: true, // set false Hide x-axis border line
            },
            axisTicks: {
              show: false, // Hide x-axis ticks
            },
          },
          yaxis: {
            labels: {
              show: false, // Hide y-axis labels
            },
            axisBorder: {
              show: false, // Hide y-axis border line
            },
          },
          grid: {
            show: false, // Hide the background grid lines
          },
          dataLabels: {
            enabled: false, // Hide data numbers
          },
          tooltip: {
            enabled: true, // Hide tooltip
            shared:false,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              return `<div class="custom-tooltip">${series[seriesIndex][dataPointIndex]}</div>`;
            },
          },
        },
        series: [
          {
            name: " Automation",
            data: [], // Data will be dynamically populated
          },
          {
            name: "Routed/Excalated",
            data: [], // Data will be dynamically populated
          },
        ],
      });

    useEffect(() => {
      // Generate dummy data
      const dummyData = generateDummyData(selectedFilters);

      // Process the data and update the chart
      const categories = dummyData.map((item) => item.category);
      const automationData = dummyData.map((item) => item.automationCount);
      const humanData = dummyData.map((item) => item.humanCount);

      setChartData((prevData) => ({
        ...prevData,
        options: {
          ...prevData.options,
          xaxis: {
            categories,
          },
        },
        series: [
          {
            ...prevData.series[0],
            data: automationData,
          },
          {
            ...prevData.series[1],
            data: humanData,
          },
        ],
      }));
    }, [selectedFilters]);

    const generateDummyData = () => {
      const categories = [
        "Invoice generation",
        "Order status",
        "Delivery status",
        "Product Exchange",
        "Order inquiry",
      ];
      const dummyData = categories.map((category) => ({
        category,
        automationCount: Math.floor(Math.random() * 100),
        humanCount: Math.floor(Math.random() * 100),
      }));

      return dummyData;
    };

    return (
      <div className="Hours-card">
        <h3>Top 5 Support Request Categories</h3>
        <div className="hours-chart">
          <Chart
            className="chart-top-support-request"
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={200}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="automation-all">
      {props.heading && <h1 className="automation-text">Automation</h1>}
      <div className="automate-dashboard">
      {props.SupportAutomationCard && <SupportAutomationCard />}
       {props.HumanHoursSavedCard && <HumanHoursSavedCard />}
        {props.CSATScoreCard && <CSATScoreCard />}
        {props.CostSavedWithAutomationCard && <CostSavedWithAutomationCard />}
        {props.AverageRequestDurationCard && <AverageRequestDurationCard />}
        {props.CreatedTicketsCard && <CreatedTicketsCard />}
        {props.InProgressTicketsCard && <InProgressTicketsCard />}
        {props.SolvedTicketsCard && <SolvedTicketsCard />}
        {props.RoutedEscalatedTicketsCard && <RoutedEscalatedTicketsCard />}
        {props.GeneratedRevenueCard && <GeneratedRevenueCard />}
        {props.CurrentAutomationQueueCard && <CurrentAutomationQueueCard />}
        {props.MostSupportRequestHoursCard && <MostSupportRequestHoursCard />}
        {props.TopSupportRequestCategoriesCard && <TopSupportRequestCategoriesCard />}
      </div>
    </div>
  );
}

export default Automation;

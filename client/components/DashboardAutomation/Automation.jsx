import React, { useEffect, useState } from "react";
import { Session } from "@shopify/shopify-api";
import useFetch from "../../hooks/useFetch";
import { ProfileMajor } from "@shopify/polaris-icons";
import "./Automation.css";
import Chart from "react-apexcharts";

function Automation() {
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
    const automationPercentage = (automationCount / totalTickets) * 100;

    return (
      <div className="card">
        <h3>Support Automation (100%)</h3>
        <div className="card-content">
          <div className="percentage">{automationPercentage}</div>
          <div className="icon">Automation Icon</div>
        </div>
      </div>
    );
  };

  const HumanHoursSavedCard = () => {
    const hoursSaved = 120; // Example value

    return (
      <div className="card">
        <h3>Human Hours Saved</h3>
        <div className="card-content">
          <div className="hours">{hoursSaved} </div>
          <div className="icon">Hours Icon</div>
        </div>
      </div>
    );
  };

  const CSATScoreCard = () => {
    const csatScore = 90; // Example value

    return (
      <div className="card">
        <h3>CSAT Score</h3>
        <div className="card-content">
          <div className="score">{csatScore}%</div>
          <div className="icon">CSAT Icon</div>
        </div>
      </div>
    );
  };

  const CostSavedWithAutomationCard = () => {
    const costSaved = 500; // Example value

    return (
      <div className="card">
        <h3>Cost Saved with Automation</h3>
        <div className="card-content">
          <div className="cost">{costSaved} USD</div>
          <div className="icon">Dollar Icon</div>
        </div>
      </div>
    );
  };

  const AverageRequestDurationCard = () => {
    const averageDuration = 15; // Example value

    return (
      <div className="card">
        <h3>Average Request Duration</h3>
        <div className="card-content">
          <div className="duration">{averageDuration} minutes</div>
          <div className="icon">Clock Icon</div>
        </div>
      </div>
    );
  };

  const CreatedTicketsCard = () => {
    const createdTickets = ticket.length;

    return (
      <div className="card">
        <h3>Created Tickets</h3>
        <div className="card-content">
          <div className="count">{createdTickets}</div>
          <div className="icon">Ticket Icon</div>
        </div>
      </div>
    );
  };

  const InProgressTicketsCard = () => {
    if (ticket === "loading...") {
      return <div>Loading...</div>;
    }
    const inProgressTickets = ticket.filter((t) => t.isComplete === false);

    return (
      <div className="card">
        <h3>In Progress Tickets</h3>
        <div className="card-content">
          <div className="count">{inProgressTickets.length}</div>
          <div className="icon">Ticket Icon</div>
        </div>
      </div>
    );
  };

  const SolvedTicketsCard = () => {
    if (ticket === "loading...") {
      return <div>Loading...</div>;
    }
    const solvedTickets = ticket.filter((t) => t.isComplete === true);

    return (
      <div className="card">
        <h3>Solved Tickets</h3>
        <div className="card-content">
          <div className="count">{solvedTickets.length}</div>
          <div className="icon">Ticket Icon</div>
        </div>
      </div>
    );
  };

  const RoutedEscalatedTicketsCard = () => {
    if (ticket === "loading...") {
      return <div>Loading...</div>;
    }
    const routedEscalatedTickets = ticket.filter((t) => t.support === "Human");
    return (
      <div className="card">
        <h3>Routed/Escalated Tickets</h3>
        <div className="card-content">
          <div className="count">{routedEscalatedTickets.length}</div>
          <div className="icon">Ticket Icon</div>
        </div>
      </div>
    );
  };

  const GeneratedRevenueCard = () => {
    const generatedRevenue = 1000; // Example value

    return (
      <div className="card">
        <h3>Generated Revenue</h3>
        <div className="card-content">
          <div className="revenue">{generatedRevenue} USD</div>
          <div className="icon">Dollar Icon</div>
        </div>
      </div>
    );
  };

  const CurrentAutomationQueueCard = () => {
    const [currentQueue, setCurrentQueue] = useState(5);
  

    const [chartData, setChartData] = useState({
      options: {
        stroke: {
          curve: 'straight',
          width: 2,
        },
        colors:['#F44336', '#E91E63', '#9C27B0'],
        chart: {
          id: "queue-chart",
          toolbar: {
            show: false, // Hide the toolbar/navbar
          },
        },
        xaxis: {
          categories: ["0-3", "3-6", "6-9", "9-12", "12-15", "15-18", "18-21", "21-24"], // Hours
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
          show: false,
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
          height={150}
          />
        </div>
          <div className="card-content">
            <div className="queue">{currentQueue}</div>
            <div className="icon">Queue Icon</div>
          </div>
      </div>
    );
  };

  const MostSupportRequestHoursCard = () => {
    const [chartData, setChartData] = useState({
      options: {
        stroke: {
          curve: 'straight',
          width: 2,
        },
        colors:['#F44336', '#E91E63', '#9C27B0'],
        chart: {
          id: "most-requested-hours-chart",
          toolbar: {
            show: false, // Hide the toolbar/navbar
          },
        },
        xaxis: {
          categories: [
            "1AM", "4AM", "7AM", "10AM", "1PM", "4PM", "7PM", "10PM", "12PM"
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
          enabled: false, // Hide data numbers
          show: false,
        },
        tooltip: {
          enabled: false, // Hide tooltip
          show: false,
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
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={300}
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
          curve: 'straight',
          width: 2,
        },
        colors:['#F44336', '#808080'],
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
          enabled: false, // Hide tooltip
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
      const categories = ["Invoice generation", "Order status", "Delivery status", "Product Exchange", "Order inquiry"];
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
          <Chart options={chartData.options} series={chartData.series} type="line" height={300} />
        </div>
      </div>
    );
  };

  

  return (
    <div className="automation-all">
      <h1 className="automation-text">Automation</h1>
      <div className="automate-dashboard">
        <SupportAutomationCard />
        <HumanHoursSavedCard />
        <CSATScoreCard />
        <CostSavedWithAutomationCard />
        <AverageRequestDurationCard />
        <CreatedTicketsCard />
        <InProgressTicketsCard />
        <SolvedTicketsCard />
        <RoutedEscalatedTicketsCard />
        <GeneratedRevenueCard />
        <CurrentAutomationQueueCard />
      <MostSupportRequestHoursCard />
      <TopSupportRequestCategoriesCard />
      </div>
    </div>
  );
}

export default Automation;

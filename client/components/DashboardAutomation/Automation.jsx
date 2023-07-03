import React, { useEffect, useState } from "react";
import { Session } from "@shopify/shopify-api";
import useFetch from "../../hooks/useFetch";
import { ProfileMajor } from "@shopify/polaris-icons";
import "./Automation.css";

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
    console.log("routedEscalatedTickets", routedEscalatedTickets);
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

  // const CurrentAutomationQueueCard = () => {
  //
  //   const currentQueue = 5; // Example value

  //   return (
  //     <div className="card">
  //       <h3>Current Automation Queue</h3>
  //       <div className="card-content">
  //         <div className="queue">{currentQueue}</div>
  //         <div className="icon">Queue Icon</div>
  //       </div>
  //     </div>
  //   );
  // };

  // const MostSupportRequestHoursCard = () => {
  //
  //   const mostRequestedHours = [3, 6, 9, 12, 15, 18, 21, 0]; // Example value

  //   return (
  //     <div className="card">
  //       <h3>Most Support Request Hours</h3>
  //       <div className="card-content">
  //         {/* Render the graph using mostRequestedHours data */}
  //         <div className="graph">Graph Here</div>
  //       </div>
  //     </div>
  //   );
  // };

  // const TopSupportRequestCategoriesCard = () => {
  //
  //   const topCategories = [
  //     { category: 'Category 1', count: 20 },
  //     { category: 'Category 2', count: 15 },
  //     { category: 'Category 3', count: 10 },
  //     { category: 'Category 4', count: 8 },
  //     { category: 'Category 5', count: 5 },
  //   ]; // Example value

  //   return (
  //     <div className="card">
  //       <h3>Top 5 Support Request Categories</h3>
  //       <div className="card-content">
  //         {/* Render the graph using topCategories data */}
  //         <div className="graph">Graph Here</div>
  //       </div>
  //     </div>
  //   );
  // };

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
        {/* <CurrentAutomationQueueCard />
      <MostSupportRequestHoursCard />
      <TopSupportRequestCategoriesCard /> */}
      </div>
    </div>
  );
}

export default Automation;

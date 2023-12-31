import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Layout, LegacyCard, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Automation from "../components/DashboardAutomation/Automation";
import Ticket from "../components/TIckerCountDashBoard/Ticket";

const HomePage = () => {
  return (
    <Page fullWidth>
      <div style={{ position: "absolute",
  left:0,
  right:0,
  top:0,
  bottom: 0.}}>
      <Navbar title = "Analytics"/>
      <Ticket graph />
      <Automation
        heading
        SupportAutomationCard
        HumanHoursSavedCard
        CSATScoreCard
        CostSavedWithAutomationCard
        AverageRequestDurationCard
        CreatedTicketsCard
        InProgressTicketsCard
        SolvedTicketsCard
        RoutedEscalatedTicketsCard
        GeneratedRevenueCard
        CurrentAutomationQueueCard
        MostSupportRequestHoursCard
        TopSupportRequestCategoriesCard
        style ={{display: 'flex',bottom: '500px',position: 'fixed'}}
      />
      </div>
    </Page>
  );
};
export default HomePage;

{
  /* <Layout>
<Layout.Section fullWidth>
  <LegacyCard
    title="Debug Cards"
    sectioned
    primaryFooterAction={{
      content: "Debug Cards",
      onAction: () => {
        navigate("/debug");
      },
    }}
  >
    <p>
      Explore how the repository handles data fetching from the backend,
      App Proxy, making GraphQL requests, Billing API and more.
    </p>
  </LegacyCard>
</Layout.Section>
<Layout.Section oneHalf>
  <LegacyCard
    sectioned
    title="Repository"
    primaryFooterAction={{
      content: "GitHub",
      onAction: () => {
        redirect.dispatch(Redirect.Action.REMOTE, {
          url: "https://github.com/kinngh/shopify-node-express-mongodb-app",
          newContext: true,
        });
      },
    }}
    secondaryFooterActions={[
      {
        content: "Open Issue",
        onAction: () => {
          redirect.dispatch(Redirect.Action.REMOTE, {
            url: "https://github.com/kinngh/shopify-node-express-mongodb-app/issues?q=is%3Aissue",
            newContext: true,
          });
        },
      },
    ]}
  >
    <p>Star the repository, open a new issue or start a discussion.</p>
  </LegacyCard>
  <LegacyCard
    sectioned
    title="Changelog"
    primaryFooterAction={{
      content: "Explore",
      onAction: () => {
        redirect.dispatch(Redirect.Action.REMOTE, {
          url: "https://shopify.dev/changelog/",
          newContext: true,
        });
      },
    }}
  >
    <p>Explore changelog on Shopify.dev and follow updates.</p>
  </LegacyCard>
</Layout.Section>
<Layout.Section oneHalf>
  <LegacyCard
    sectioned
    title="Documentation"
    primaryFooterAction={{
      content: "Explore APIs",
      onAction: () => {
        redirect.dispatch(Redirect.Action.REMOTE, {
          url: "https://shopify.dev/graphiql/admin-graphiql",
          newContext: true,
        });
      },
    }}
    secondaryFooterActions={[
      {
        content: "Design Guidelines",
        onAction: () => {
          redirect.dispatch(Redirect.Action.REMOTE, {
            url: "https://shopify.dev/apps/design-guidelines",
            newContext: true,
          });
        },
      },
    ]}
  >
    <p>
      Explore the GraphQL APIs in Graphiql or read design guidelines.
    </p>
  </LegacyCard>
  <LegacyCard
    sectioned
    title="Hiring?"
    primaryFooterAction={{
      content: "Twitter",
      onAction: () => {
        redirect.dispatch(Redirect.Action.REMOTE, {
          url: "https://www.twitter.com/kinngh",
          newContext: true,
        });
      },
    }}
    secondaryFooterActions={[
      {
        content: "LinkedIn",
        onAction: () => {
          redirect.dispatch(Redirect.Action.REMOTE, {
            url: "https://www.linkedin.com/in/theharshdeep/",
            newContext: true,
          });
        },
      },
    ]}
  >
    <p>🌎 / 🇨🇦 and looking to expand your engineering team?</p>
  </LegacyCard>
</Layout.Section>
<Layout.Section fullWidth>
  <LegacyCard
    sectioned
    title="Developer Notes"
    primaryFooterAction={{
      content: "Read More",
      onAction: () => {
        navigate("/debug/devNotes");
      },
    }}
  >
    <p>
      Read notes on opening an issue, creating App Extensions and more.
    </p>
  </LegacyCard>
</Layout.Section>
</Layout> */
}

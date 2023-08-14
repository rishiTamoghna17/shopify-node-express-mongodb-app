import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";
import subscriptionRoute from "./recurringSubscriptions.js";
import Ticket from "../../utils/models/TicketModel.js";
import zd from "../libs/zendeskClient.js";
import axios from "axios";
import shopify from "../../utils/shopifyConfig.js";
const userRoutes = Router();
userRoutes.use(subscriptionRoute);

userRoutes.get("/api", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  res.status(200).json(sendData);
});

userRoutes.post("/api", (req, res) => {
  res.status(200).json(req.body);
});

//******************************************************************************************* */

//create zendesk ticket api
userRoutes.post("/api/createZendeskTicket", (req, res) => {
  const {
    subject,
    description,
    requesterName,
    requesterEmail,
    priority,
    status,
  } = req.body;

  const ticketData = {
    ticket: {
      subject,
      description,
      requester: {
        name: requesterName,
        email: requesterEmail,
      },
      priority,
      status,
    },
  };
  zd.tickets.create(ticketData, (err, req, result) => {
    if (err) {
      console.error("Error creating Zendesk ticket:", err);
      res.status(500).json({ error: "Failed to create Zendesk ticket" });
    } else {
      // console.log('Zendesk ticket created:', result);
      res.status(201).send({
        result: result,
        message: "Zendesk ticket created successfully!",
        success: true,
      });
    }
  });
});

// retrieve all tickets
userRoutes.get("/api/tickets", (req, res) => {
  // Use the 'tickets' API to get all tickets
  zd.tickets.list((err, req, result) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      res.status(500).json({ error: "Failed to fetch tickets" });
    } else {
      const tickets = result;
      // console.log('All tickets:', JSON.stringify(result.slice(0,2)));
      res.status(200).send(tickets);
    }
  });
});

// retrieve conversation tickets
userRoutes.get("/api/tickets/:ticketId/conversations", async (req, res) => {
  const { ticketId } = req.params;

  // Use the Zendesk API client to fetch ticket comments
  zd.tickets.getComments(ticketId, (err, req, result) => {
    if (err) {
      console.error("Error fetching ticket comments from Zendesk:", err);
      res
        .status(500)
        .json({ error: "Failed to fetch ticket comments from Zendesk" });
    } else {
      res.status(200).send(result);
    }
  });
});

//update ticket
// userRoutes.post('/api/tickets/:ticketId/closeTicket', async (req, res) => {
//   const { ticketId } = req.params;
//   const {status} = req.body;
//   // Use the Zendesk API client to close the ticket
//   zd.tickets.update(ticketId, {
//     ticket: {
//       status: status,
//     },
//   }, (err, req, result) => {
//     if (err) {
//       console.error('Error closing the ticket:', err);
//       res.status(500).json({ error: 'Failed to close the ticket' });
//     } else {
//       console.log(result)
//       res.status(200).send({ message: 'Ticket closed successfully!', success: true });
//     }
//   });
// });

// Add conversation to a ticket
userRoutes.post("/api/tickets/:ticketId/addConversation", async (req, res) => {
  const { ticketId } = req.params;
  const { body, authorEmail, authorId, status } = req.body;

  // Use the Zendesk API client to add a new conversation to the ticket
  zd.tickets.update(
    ticketId,
    {
      ticket: {
        comment: {
          body,
          public: true,
          author_id: authorId,
          author_email: authorEmail,
        },
        status: status,
      },
    },
    (err, req, result) => {
      if (err) {
        console.error("Error adding conversation to ticket:", err);
        res.status(500).json({ error: "Failed to add conversation to ticket" });
      } else {
        res
          .status(201)
          .send({ message: "Conversation added successfully!", success: true });
      }
    }
  );
});

userRoutes.get("/api/orders", async (req, res) => {
  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });
    const order = await client.query({
      data: `query {
      orders(first: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
    });

    console.log("orders", order.body.data.orders.edges);
    res.status(200).send(order.body.data.orders);
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

userRoutes.get("/api/products", async (req, res) => {
  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });

    const products = await client.query({
      data: `query {
        products(first: 10, reverse: true) {
          edges {
            node {
              id
              title
              handle
              resourcePublicationOnCurrentPublication {
                publication {
                  name
                  id
                }
                publishDate
                isPublished
              }
            }
          }
        }
      }
  `,
    });
    res.status(200).send(products.body.data.products.edges);
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// userRoutes.get("/api/orders", async (req, res) => {
//   try {
//     const { session } = await clientProvider.restClient({
//       req,
//       res,
//       isOnline: false,
//     });
//     const order = await shopify.api.rest.Order.all({
//       session: session,
//       status: "any",
//     });
//     console.log("orders", order);
//     res.status(200).send(order);
//   } catch (err) {
//     console.error("error", err);
//     res.status(500).json({ error: "Failed to fetch orders" });
//   }
// });
//****************************************************************//

userRoutes.get("/api/gql", async (req, res) => {
  //false for offline session, true for online session
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: false,
  });
  const shop = await client.query({
    data: `{
      shop {
        name
      }
    }`,
  });

  res.status(200).send(shop);
});

export default userRoutes;

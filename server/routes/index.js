import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";
import subscriptionRoute from "./recurringSubscriptions.js";
import Ticket from "../../utils/models/TicketModel.js";
import zd from "../libs/zendeskClient.js";

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

//create tickets
userRoutes.post('/api/tickets', async (req, res) => {
  try {
    const { subject, description, requester, priority, support } = req.body;

    const ticket = new Ticket({
      subject,
      description,
      requester,
      priority,
      support
    });

    await ticket.save();

    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a ticket' });
  }
});
// Get all tickets
userRoutes.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get the tickets' });
  }
});

//create zendesk ticket api
userRoutes.post('/api/createZendeskTicket', (req, res) => {

  const { subject, description, requesterName, requesterEmail } = req.body;

  // Prepare the ticket data
  const ticketData = {
    ticket: {
      subject,
      description,
      requester: {
        name: requesterName,
        email: requesterEmail,
      },
    },
  };

  // Create the ticket
  zd.tickets.create(ticketData, (err, req, result) => {
    if (err) {
      console.error('Error creating Zendesk ticket:', err);
      res.status(500).json({ error: 'Failed to create Zendesk ticket' });
    } else {
      // console.log('Zendesk ticket created:', result);
      res.status(201).json({ success: true });
    }
  });
});


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

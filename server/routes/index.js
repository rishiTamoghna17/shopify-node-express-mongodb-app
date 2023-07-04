import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";
import subscriptionRoute from "./recurringSubscriptions.js";
import Ticket from "../../utils/models/TicketModel.js";

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
const express = require("express");
const {Ticketlist,CreateTicket,TicketDetail,SelectSeat,processTransaction,allTransaction,allTransactionPerUser} = require("../controller/ticket.controller")
require("dotenv").config();
const Ticket_Router = express.Router();
//Ticket_Router get method
Ticket_Router.get("/ticketlist", Ticketlist);
//details by get method
Ticket_Router.get("/ticketdetails/:id",TicketDetail);
// Ticket_Router post method
Ticket_Router.post("/createticket", CreateTicket);
// Ticket_Router for seat selection by post method
Ticket_Router.post("/seat_selection",SelectSeat);
//payment method
Ticket_Router.post('/transiction-process', processTransaction)
Ticket_Router.get('/transiction-list', allTransaction)
Ticket_Router.get('/transiction-list-user', allTransactionPerUser)

module.exports= {Ticket_Router }
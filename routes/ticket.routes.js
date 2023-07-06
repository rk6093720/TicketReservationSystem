const express = require("express");
const {Ticketlist,CreateTicket,TicketDetail} = require("../controller/ticket.controller")
require("dotenv").config();
// const {Router} = require("express");

require("dotenv").config();
const route = express.Router();


//route get method
route.get("/ticketlist", Ticketlist);
//details by get method
route.get("/ticketdetails/:id",TicketDetail);
// route post method
route.post("/createticket", CreateTicket)

module.exports=route
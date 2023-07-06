const mongoose = require("mongoose");
const cart_Ticket_Schema = new mongoose.Schema({
  person_id: { type: String, required: true },
  ticket_id: { type: String },
  ticket_details: {
    amount: String,
    name: String,
    age: String,
    gender:String,
  },
});
const CartTicketModel = mongoose.model("CART_TICKET", cart_Ticket_Schema);
module.exports = { CartTicketModel };
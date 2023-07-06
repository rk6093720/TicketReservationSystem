const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
//    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:{type:String, require:true},
    age:{type:String, require:true},
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    isconfirm:{type:Boolean,require:false},
    seats: [
        {
          number: { type: String, required: true },
          isBooked: { type: Boolean, default: false },
        },
      ],
    transactionType: { type: String, enum: ['deposit', 'withdraw'], required: true },
   amount: { type: Number, required: true },
   timestamp: { type: Date, default: Date.now },

}) 
const TicketModal = mongoose.model("TICKET",ticketSchema);
module.exports={
    TicketModal
}
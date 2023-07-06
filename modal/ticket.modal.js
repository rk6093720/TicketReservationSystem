const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:String, required:true},
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    isconfirm:{type:Boolean,required:false, require:true},
    seats: {type: String,required: true, unique: true},
    transactionType: { type: String, enum: ['deposit', 'withdraw'], required: true },
   amount: { type: Number, required: true },
   timestamp: { type: Date, default: Date.now },

}) 
const TicketModal = mongoose.model("TICKET",ticketSchema);
module.exports={
    TicketModal
}
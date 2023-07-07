const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:String, required:true},
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    isconfirm:{type:Boolean,default:false, require:true},
    seat: {type: String,enum:["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","p1","p2","p3","p4","p5","p6","p7","p8","p9","p10",],required: true  },
    transactionType: { type: String, enum: ['deposit', 'withdraw'], required: true },
   amount: { type: Number, required: true },
   timestamp: { type: Date, default: Date.now },

}) 
const TicketModal = mongoose.model("TICKET",ticketSchema);
module.exports={
    TicketModal
}
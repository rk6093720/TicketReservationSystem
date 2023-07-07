const {TicketModal}= require("../modal/ticket.modal");
const { UserModal } = require("../modal/user.modal");
//get ticketlist
const Ticketlist = async(req,res)=>{
    try{
      const ticketlist= await TicketModal.find();
      console.log(ticketlist);
      res.status(201).json({Message:"ticket list is success",Success:true,ticketlist})
    }catch(error){
      console.log(error);
      res.status(404).json({message:"ticket list not found"})
    
    }
}

//get TicketDetail
const TicketDetail = async(req,res)=>{
    // const age = req?.params?.age;
    const id = req?.params?._id;
    // res.send(params);
    // console.log(id);
    const value = await TicketModal.findOne({  id });
    console.log(value)
    try {
      return res.send({ data: value });
    } catch (err) {
      return res.send({ msg: "no data" });
    }
}
//post ticketlist

const CreateTicket = async(req,res)=>{
     const {name,age,gender,isconfirm,seat,transactionType,amount,timestamp}=(req.body);
    try{
      const newTicket = await TicketModal.create({
        name,
        age,
        gender,
        isconfirm,
        seat,
        transactionType,
        amount,
        timestamp
   })
    res.status(201).json({message:"ticket is created  succesfully",Success:true,newTicket})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"ticket is not created"})
    }
}
//seat selection
const SelectSeat=async(req,res)=>{
     const id= req?.params?.id;
    //  console.log(id)
     try {
    const seat = await TicketModal.findOne({id})
    console.log(seat)
    if(!seat){
        return res.status(404).json({message:"seat is not found"});
    }
    if(seat.isconfirm){
      return res.status(400).json({ message: 'Seat is already reserved' });    
    }
    seat.isconfirm= true;
    await seat.save();
     res.status(200).json({message:"seat confirm successfully",seat})
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' })
   }
}

// payment of ticket
const processTransaction = async (req, res) => {
  const { amount, type } = req.body;
  const {accesstoken, userid} = req.headers;

  try {
    const user = await UserModal.findById(userid);

    if(accesstoken!==user.accessToken){
      return res.status(400).json({ message: 'Not access'});
    }
    
    if (type === 'deposit') {
      user.amount += Number(amount);
    }else if (type === 'withdraw'){
      if (user.amount < Number(amount)) {
        return res.status(400).json({ message: 'Insufficient Funds' });
      }
      user.amount -= Number(amount);
    }
    await user.save();
    
    const transaction = new TicketModal({ user: userid, amount, transactionType: type });

    await transaction.save();

    res.json({ message: 'Transaction processed successfully', user: {userId: user._id, email: user.email, accessToken: user.accessToken, amount: user.amount}});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const allTransaction = async (req, res) => {
  const {accesstoken, userid} = req.headers;

  try {
    const user = await UserModal.findById(userid);

    if(accesstoken!==user.accessToken){
      return res.status(400).json({ message: 'Not access'});
    }

    const transactionList = await TicketModal.find({ user: userid });

    res.json(transactionList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const allTransactionPerUser = async (req, res) => {
  const {accesstoken, userid, adminid} = req.headers;

  try {
    const user = await UserModal.findById(adminid);

    if(accesstoken!==user.accessToken){
      return res.status(400).json({ message: 'Not access'});
    }

    const transactionList = await TicketModal.find({ user: userid });
    res.json(transactionList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports={
    Ticketlist,
    CreateTicket,
    TicketDetail,
    SelectSeat,
    processTransaction,
    allTransaction,
    allTransactionPerUser

}
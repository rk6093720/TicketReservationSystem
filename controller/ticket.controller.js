const {TicketModal}= require("../modal/ticket.modal");
//get ticketlist
const Ticketlist = async(req,res)=>{
    var q = req?.query;
    if (q.name || q.age || q.sort_amount ) {
      let name;
      let age;
        q.name
        ? (name = { name: { $regex: "^" + q.name, $options: "i" } })
        : (name = null);
      q.age
        ? (age = { age: { $regex: "^" + q.age, $options: "i" } })
        : (age = null);
      let value = [name,age];
      let newvalue = value.filter((el) => el != null);
      console.log(newvalue)
      if (newvalue.length > 0) {
        let data = await TicketModal.find({ $and: [...newvalue] })
        try {
          return res.send({ data: data });
        } catch (err) {
          return res.status(400).send({ error: err.message });
        }
      } else {
        let data = await TicketModal.find()
        try {
          return res.send({ data: data });
        } catch (err) {
          return res.status(400).send({ error: err.message });
        }
      }
    } else {
      let data = await TicketModal.find();
      try {
        return res.send({ data: data });
      } catch (err) {
        return res.status(400).send({ error: err.message });
      }
    }
}

//get TicketDetail
const TicketDetail = async(req,res)=>{
    // const age = req?.params?.age;
    const id = req?.params?._id;
    // res.send(params);
    console.log(id);
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
     const newTicket = new TicketModal({
          name,
          age,
          gender,
          isconfirm,
          seat,
          transactionType,
          amount,
          timestamp,
          userid:req.user
     })
    try{
       const NewUserTicket= await newTicket.save();
       console.log(NewUserTicket)
       if(NewUserTicket){
            res.status(201).json({message:"ticket is created  succesfully",Success:true,NewUserTicket})
       }else{
        res.status(500).json({message:"ticket is not created"})
       }
        // res.status(201).json(newTicket)
    }catch(err){
        console.log(err);
        res.status(500).json({message:"ticket is not created"})
    }
}
module.exports={
    Ticketlist,
    CreateTicket,
    TicketDetail

}
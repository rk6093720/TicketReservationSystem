const { CartTicketModel } = require("../modal/cart_Ticket.modal");

const getcart = async (req, res) => {
  const user_id = req?.body?.user_id;
  console.log(user_id)
  try {
    const value = await CartTicketModel.find({ ticket_id: user_id });
    res.send({ data: value });
  } catch (error) {
     console.log(error)
  }
 
};
const addcart = async (req, res) => {
  const user_id = req?.body?.user_id;
  console.log(user_id)
  const { ticket_id, ticket_details,seat,amount } = req?.body;
  const isdata = await CartTicketModel.findOne({
    ticket_id,
    person_id: user_id,
  });
  if (isdata) {
    await CartTicketModel.findOneAndUpdate(
      { ticket_id, person_id: user_id },
      { $inc: { item_no: 1 } }
    );
    try {
      return res.send({ msg: `cart ticket added successfully${ticket_id}` });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } else {
    let newcartdata = await CartTicketModel({
      person_id: user_id,
      ticket_id,
      ticket_details,
      seat,
      amount
    });
    try {
      await newcartdata.save();
      return res.send({ msg: `ticket added successfully${ticket_id}` });
    } catch (err) {
      return res.status(400).send({ err: err.message });
    }
  }
};
const updatecart = async (req, res) => {
  const user_id = req?.body?.user_id;
  const { id } = req.params;
  const { ticket_id, ticket_details, seat , amount } = req?.body;
  await CartTicketModel.findOneAndUpdate(
    { person_id: user_id, ticket_id: id },
    {seat,amount},
    { new: true }
  );
  try {
    return res.send({ msg: `updated successfully :${ticket_id}` });
  } catch (err) {
    return res.send({ error: err.message });
  }
};
const deletecart = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req?.body;
  try {
    await CartTicketModel.findOneAndDelete({ticket_id: id, person_id: user_id});
    res.send({ msg: `data deleted ${id}` });
  } catch (err) {
    res.status.send({ error: err.message });
  }
};

const AddtocartController = {
  addcart,
  getcart,
  updatecart,
  deletecart,
};
module.exports = { AddtocartController };
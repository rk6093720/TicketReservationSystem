const {Router} = require("express");
const {Signup, Signin} = require("../controller/user.controller");
require("dotenv").config();
const route = Router();
route.get("",(req,res)=>{
    console.log("TicketReservationSystem");
    res.send("welcome to our TicketReservationSystem ")
})
// user signup
route.post("/create", Signup);
// user login
route.post("/login", Signin)

module.exports=route;
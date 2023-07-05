const express = require("express");
const {Signup, Signin} = require("../controller/user.controller")
const route = express();
// user signup
route.post("/reqister", Signup);
// user login
route.post("/login", Signin)

module.exports=route;
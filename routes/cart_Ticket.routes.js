const express = require("express");
const { getcart ,updatecart, addcart, deletecart } = require("../controller/addtocart.controller");
require("dotenv").config();
const addtoCartRouter = express.Router();
addtoCartRouter.get("/cartlist", getcart);
addtoCartRouter.patch("/:id", updatecart);
addtoCartRouter.post("/addcart", addcart);
addtoCartRouter.delete("/:id", deletecart);


module.exports =  addtoCartRouter ;
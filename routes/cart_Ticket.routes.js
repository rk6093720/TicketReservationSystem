const express = require("express");
const {AddtocartController } = require("../controller/addtocart.controller")
require("dotenv").config();
const addtoCartRouter = express.Router();
addtoCartRouter.get("/cart", AddtocartController.getcart );
addtoCartRouter.post("/addcart",AddtocartController.addcart);
addtoCartRouter.delete("/delete/:id",  AddtocartController.deletecart);
addtoCartRouter.patch("/edit/:id",  AddtocartController.updatecart);
module.exports = { addtoCartRouter} ;
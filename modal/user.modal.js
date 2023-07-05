const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{ type:String, require:true},
    password:{type:String, require:true}
})
const UserModal = mongoose.model("USER", userSchema);
module.exports={
    UserModal
}
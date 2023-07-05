const { UserModal} = require("../modal/user.modal");

const Signup = async(req,res)=>{
    const {email, password, cpassword} = req.body;
    if(!email || !password || !cpassword){
       return  res.status(422).json({msg:"Please fill credintial"})
    }
    try {
        const userexist = await UserModal.findOne({email});
        if(userexist){
            return res.status(422).json({msg:"email already exist"})
        }
        const user = new UserModal({email, password, cpassword});
        const userregister = await user.save();
        if(userregister){
            res.status(201).json({msg:"user reqister successfully"})
        }else{
            res.status(500).json({msg:"failed registered"})
        }
    } catch (err) {
        console.log(err);
    }
}
const Signin=async()=>{
  try {
     const {email,password}= req.body;
     if(!email || !password){
        return res.status(400).json({msg:"please filled the data"})
     }
     const userLogin = await UserModal.findOne({email:email});
     res.json({msg:"user has login successfully"})

  } catch (error) {
    console.log(error);
  }
}
module.exports={
    Signup,
    Signin
}
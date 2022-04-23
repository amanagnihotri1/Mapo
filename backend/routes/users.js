var bcrypt=require("bcryptjs");
const router =require("express").Router();
const User=require("../models/User");
//register
router.post("/register",async(req,res)=>
{  
    try
    {
     //generating new password
     const salt=await bcrypt.genSalt(10);
     const hashedPass=await bcrypt.hash(req.body.password,salt);
     const newUser=new User({
      username:req.body.username,
      email:req.body.email,
      password:hashedPass,   
     });   
     const user=await newUser.save();
     res.status(200).json(user);
     console.log(req.username);
    }catch(err)
    {    console.log("there is an error");
        res.json(err);
    }
});
//login
router.post("/login",async(req,res)=>
{
    try
    {
       const user=await User.findOne({username:req.body.username});
       !user && res.status(400).json("User not found");
       const validatePass=await bcrypt.compare(req.body.password,user.password);
       !validatePass && res.status(400).json("wrong username or password");
       res.status(200).json({_id:user._id,username:user.username});
     }
     catch(err)
     {
         console.log(err);
     }
});
module.exports=router;
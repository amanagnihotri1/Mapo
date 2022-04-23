const mongoose=require("mongoose");
const Userschema=new mongoose.Schema({
  username:{
   type:String,
   required:true,
   unique:true   
  },
  email:{
   type:String,
   required:true 
  },
  password:
  {
      type:String,
      required:true,
      min:5
  } 
},
{timestamps:true}
);
module.exports=mongoose.model("User",Userschema);
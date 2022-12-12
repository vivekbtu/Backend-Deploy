

const { Router } = require("express")
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/user.model");
const userRouter = Router();
const jwt = require("jsonwebtoken")
require("dotenv").config();


userRouter.post("/signup", async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    const userPresent = await UserModel.findOne({email})
    
    if(userPresent?.email){
        res.send("User already exist")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new UserModel({email,password:hash})
                await user.save()
                res.send("Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again later")
       }
    }
    
})

userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, process.env.KEY);
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong in Login, please try again later")
    }
})


module.exports = { userRouter }



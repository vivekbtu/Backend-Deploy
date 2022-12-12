const express = require("express");
const cors = require("cors")


const { connection } = require("./config/db");
const { todoRouter } = require("./routes/todo.router");
const { userRouter } = require("./routes/user.router");
const { Authentication } = require("./middleware/authentication");

const app = express();
app.use(express.json())
app.use(cors({
    origin : "*"
}))

require("dotenv").config();


app.get("/",(req,res)=>{
    res.send("Welcome to Our Todo App")
})

app.use("/user",userRouter)

app.use(Authentication)
app.use("/todos",todoRouter)
 
const PORT = process.env.PORT
app.listen(PORT,async()=>{
    try{
        await connection
        console.log(`Listening  http://localhost:${PORT}`)
    }
    catch(err){
        console.log(err)
    }
})
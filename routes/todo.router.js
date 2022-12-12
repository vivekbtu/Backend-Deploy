
const { Router } = require("express");
const { TodoModel} = require("../Models/todo.model");

const todoRouter = Router();


todoRouter.get("/", async (req,res)=> {

    const getTodo = await TodoModel.find();
    res.send(getTodo);
})


todoRouter.get("/:todoId", async (req,res)=> {

    const { todoId } = req.params;
    const Id = Number(todoId);
    const getTodo = await TodoModel.find({"_id": `${Id}`});
    res.send(getTodo);
})

// Pending get
// todos/status?status=pending

todoRouter.get("/status", async (req, res)=> {
    const {status} = req.query;
    const data = status;

    try{
        const todos = await TodoModel.find({"status": `${data}`});
        res.send(todos)
    }
    catch(err){
        res.send("Something went wrong in get method");
        console.log(err);
    }
})

// Done get
// todos/status?status=done

todoRouter.get("/status", async (req, res)=> {
    const {status} = req.query;
    const data = status;

    try{
        const todos = await TodoModel.find({"status": `${data}`});
        res.send(todos)
    }
    catch(err){
        res.send("Something went wrong in get method");
        console.log(err);
    }
})


todoRouter.post("/create", async (req, res) => {
    const payload = req.body
    
    try{
        const new_todo = new TodoModel(payload)
        await new_todo.save()
        res.send({"msg" : "Todo created successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong in Todo Post"})
    }
})



module.exports = { todoRouter };
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//dotenv setup
const dotenv = require('dotenv');
dotenv.config();

const router = require("./auth.js");
const verify = require('./Verify.js')

const port = process.env.PORT || 8080;

const URI  = process.env.MONGO_URI ;

//crreate db
const db = mongoose.createConnection(URI , {
    useNewUrlParser:true , useUnifiedTopology:true , useFindAndModify:true
})

db.on('error', (err)=>console.error(err));
db.once('open', ()=>{
        console.log('db connection open');
});

const {todoModel }  = require("./createDatabase.js");

const app = express();
app.use(cors({
    credentials:true , 
    origin: "https://tanmays-todo.herokuapp.com"
}
))
app.use(express.json());
app.use(router);

const isInvalid = (obj)=>obj===null || obj===undefined ;

app.post("/todo" ,verify , async (req,res)=>{
    
    const update = req.body ;

    let userId = req.userID;

    const existingTodo = await todoModel.findOne({userId});

    if(isInvalid(existingTodo)) { 
        res.status(403).json({messsage:"user is forbidden"});
        return;
    }

    existingTodo.todos = update ;
    await existingTodo.save().then(()=>res.json({message : "post success"})); 

})

app.get("/todo",verify ,  async (req,res)=>{

    let userId = req.userID ;

    const existingTodo = await todoModel.findOne({userId});

    if(isInvalid(existingTodo)){
        let newEntry = new todoModel({ userId , todos:[] });
        await newEntry.save().then(()=>res.status(200).json(newEntry.todos));       
        return
    }


    res.status(200).json(existingTodo.todos)
})







app.listen(port , ()=>console.log("app is listening on port " , port))



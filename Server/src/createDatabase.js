const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// const URI  = process.env.MONGO_URI

// const db = mongoose.createConnection(URI , {
//     useNewUrlParser:true , useUnifiedTopology:true , useFindAndModify:true
// })

// db.on('error', (err)=>console.error(err));
// db.once('open', ()=>{
//         console.log('db connection open');
// });

const userSchema = mongoose.Schema({
    name:{type:String , required:true}, password:{type:String , required:true} ,
})

const todoSchema = mongoose.Schema({
    userId:mongoose.Schema.ObjectId , todos : [
        {task : {type:String , required:true}, time : String, date:String, checked: Boolean, task_id: String}
    ]
});

 const userModel = db.model("userModel",userSchema);

const todoModel =  db.model("todoModel" , todoSchema);


exports.userModel = userModel
exports.todoModel = todoModel


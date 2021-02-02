import React, { useState, useContext, useEffect } from 'react'
import {useHistory} from "react-router-dom"
import "../App.css"
import "./Todo.css"
import { CredentialsContext } from "../App";
import {HandleErrors} from "../Pages/Register.js"
// import axios from "axios";
import ListItem from "./ListItem.js";

// const API = axios.create({
//     baseURL : "http://localhost:8080",
//     // params:{
//     //     userName : 
//     // }
// })

function Todo() {
    const [credentials] = useContext(CredentialsContext);
    const [arrayList, setArrayList] = useState([]);
    const [task , setTask ] = useState("");
    const [deadDate , setDeadDate] = useState("");
    const [deadTime , setDeadTime] = useState("");
    const history = useHistory();

   const persist = (newArr)=>{
       fetch("https://todo-backend-tanmays.herokuapp.com/todo" , {
           method:"POST",
           headers:{
               "Content-Type":"application/json" ,
               Authorization : `Basic ${credentials.authToken}`,
           },
          
           body: JSON.stringify(newArr),
           credentials:"include"
       }).then(HandleErrors).then((r)=>console.log(r)).catch((err)=>console.log(err));
   }

   useEffect(()=>{
       if(!credentials) {
            
            return history.push("/");
       }
       fetch("https://todo-backend-tanmays.herokuapp.com/todo" , {
           method:"GET",
           headers:{
               "Content-Type":"application/json",
               Authorization: `basic ${credentials.authToken}`
           },
           credentials:"include"
       })
       .then(HandleErrors).then((todo)=>{
           setArrayList([...todo]); return ;
       }).catch((err)=>console.log(err))
       
   } , []);

    const addI = async () => { 
        let newTask = {
            task: task,
            date: deadDate,
            time: deadTime,
            checked : false,
            task_id : arrayList.length
        }
        const newTodoP = [...arrayList , newTask]
        setArrayList(newTodoP);
        persist(newTodoP);
        setTask(""); setDeadDate("") ; setDeadTime("");
        return;
    }

    const deleteI = async (id)=>{
        arrayList.splice(id,1);
        // await API.delete("/todo/tanmay" , {task_id:id} )
        setArrayList([...arrayList]);
        persist(arrayList);
        return
    }

    const saveI = (update , id)=>{
        let newArrayList = [...arrayList]
        newArrayList[id]={...newArrayList[id] , ...update} ; 
        setArrayList(newArrayList);
        persist(newArrayList);
        return ;
    }

    return (
        <>
            <div className="glass-todoAdd">
                <div className="add-list">
                    <div className="input-task">
                        Task :
                            <input type="text" onChange={(e)=>setTask(e.target.value)} value={task} />
                    </div>
                    <div className="input-deadline" >
                        Dead-Line :
                            <input type="date" onChange={(e)=>setDeadDate(e.target.value)} value={deadDate}  />
                            <input type="time" onChange={(e)=>setDeadTime(e.target.value)} value={deadTime} />
                    </div>
                </div>
                <div className="Buttons">
                    <button disabled={!task} onClick={addI} >Add</button>
                </div>
            </div>
            <div className="glass-list">
                {
                    arrayList.map((itm, idx) => {
                        return <div key={idx} className="listItem-card"  >
                            <ListItem item={itm} id={idx} deleteI = {deleteI} saveI={saveI} />
                        </div>
                    })
                }
            </div>
            <div className="circle1"></div>
            <div className="circle2"></div>
        </>
    )
}

export default Todo 

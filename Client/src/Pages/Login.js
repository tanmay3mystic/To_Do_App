import React , {useState, useContext  } from 'react'
import {useHistory} from "react-router-dom";
import "../App.css"
import "./Register.css"

import { CredentialsContext } from "../App";

import {HandleErrors} from "./Register.js"



function Login() {
    const [name , setName]= useState("");
    const [password , setPassword]= useState("");
    const [error , setError] = useState("")
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const history = useHistory();

    const postIt = ()=>{
        fetch("https://todo-backend-tanmays.herokuapp.com/login" , {
            method:"POST" ,
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({
                name , password
            }),
            credentials:'include'
        }).then( HandleErrors)
        .then((r)=>{
            const {token}= r;
            setCredentials({
                name,
                password,
                authToken: token
              });
            history.push("/todo");
        }).catch((err)=>setError(err.message))
    }

    const SubmitHandle = (e)=>{
        e.preventDefault();
        setError("Requesting....");
         postIt();
        return
    }

    return(<>
        <div className="glass-form" >{console.log()}
            <h1>Login Form </h1>
            <div className="Line" ></div>
            <form className="form" onSubmit={SubmitHandle} >
                    <input type="text"
                    placeholder="Name"  onChange={(e)=>setName(e.target.value)}
                    value={name}
                    />
                    <input type="password"
                    placeholder="password"  onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    />
                    { error && <h3 style={{color:"red"}} >{error}</h3> }
                    <button type="submit"  >Login</button>
            </form>
            
        </div>
        </>
    )
}

export default Login

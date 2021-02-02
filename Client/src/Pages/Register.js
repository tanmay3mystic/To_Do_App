import React , {useState, useContext  } from 'react'
import {useHistory} from "react-router-dom";
import "../App.css"
import "./Register.css"
import { CredentialsContext } from "../App";

export  const HandleErrors =  async (resp)=>{
    if(!resp.ok){
        const { message } = await resp.json();
        throw Error(message);
    }
    return resp.json();
}

function Register() {
    const [name , setName]= useState("");
    const [password , setPassword]= useState("");
    const [error , setError] = useState("")
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const history = useHistory();

    const postIt = ()=>{
        fetch("https://todo-backend-tanmays.herokuapp.com/signup" , {
            method:"post" ,
            headers:{ "content-type":"application/json" },
            body: JSON.stringify({
                name , password
            }),
            credentials:'include'
        }).then( HandleErrors )
        .then((r)=>{
            const {token}= r;
            setCredentials({
                name,
                password,
                authToken: token
              });
            history.push("/todo");
        }).catch((err)=>{
            setError(err.message);
        }) 
    }

    const SubmitHandle = (e)=>{
        e.preventDefault();
        setError("Requesting...")
        postIt();
        console.log(credentials);
        return
    }



    return(<>
         
        <div className="glass-form" >
            <h1>Registration Form </h1>
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
                { error && <h5 style={{color:"red"}} >{error}</h5> }
                <button type="button" onClick={SubmitHandle} >Register</button>
            </form>

        </div>
        </>
    )
}

export default Register

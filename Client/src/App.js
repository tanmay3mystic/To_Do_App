import React , {useState } from 'react'
import "./App.css"
import { BrowserRouter as Router , Route , Switch , Link  } from "react-router-dom"
import Todo from "./components/Todo.js";
import Home from "./Pages/Home";

import Register from "./Pages/Register.js";
import Login from "./Pages/Login.js";


export const CredentialsContext = React.createContext();


function App() {
    const credentialsState = useState(null);
    const [credentials, setCredentials] = credentialsState ;
    // const history = useHistory()

    const logoutHandle = ()=>{
        setCredentials(null);
        return ;
    }

    return (
        <Router>
            <CredentialsContext.Provider value={credentialsState}>
            <div id="main" >
                <div className="nav">
                    {
                        !credentials?<div><Link to="/register" ><button id="register" >Register</button></Link>
                        <Link to="/login" ><button id="login" >Login</button  ></Link></div>
                        :<>
                            <h2>Welcome {credentials.name} !!!</h2>
                            <Link to="/" ><button type="button" onClick={logoutHandle} >Logout</button> </Link>   
                        </>
                    }                      
                </div> 
                <div id="mainRender">
                <Switch>
                    
                        <Route exact path="/" component={Home} /> 
                        <Route exact path="/register" render={(props)=> <Register {...props} />  } />
                        <Route exact path="/login" render={(props)=> <Login {...props} />}  />
                        <Route exact path="/todo" render={(props)=> <Todo {...props} />  }  />   
                           
                </Switch> 
                </div>
            </div>
            <div className="circle1"></div>
            <div className="circle2"></div>
            </CredentialsContext.Provider>
        </Router>
    )
}

export default App


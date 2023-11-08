import logo from './logo.svg';
import './App.css';

import{
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation,
    Link,
} from "react-router-dom";
import React from "react";
import Login from './Login.js'
import SelectProjects from './SelectProjects.js'
import ViewProject from './ViewProject.js'
import CreateAccount from './CreateAccount.js'
import CreateProject from './CreateProject.js'


function App(){
    return(
        <Router>
            <div>
                <Routes>
                    <Route path = "/" element={<Login />} exact/>
                    <Route path = "/Projects" element = {<SelectProjects />} />
                    <Route path = "/ProjectView" element={<ViewProject />} />
                    <Route path = "/CreateAccount" element = {<CreateAccount />} />
                    <Route path = "/CreateProject" element = {<CreateProject />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;

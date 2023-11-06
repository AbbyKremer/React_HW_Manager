import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import{
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation,
    Link,
} from "react-router-dom";
import React, {useState} from "react";


function Login (){
    const [user, setUser] = useState("");
    const[pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                    password: pass
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                navigate('/Projects', {state:{"user":user}});
            } else {
                setUser("");
                setPass("");
                alert('Login failed: Incorrect username or password. Please try again.');
            }
            } catch (error) {
                setUser("");
                setPass("");
                alert('An error occurred, please try again later.');
        }
    };
    const handleRegister = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/addUser", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                    password: pass
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                navigate('/Projects', {state:{"user" :  user}});
                alert('User successfully created.');
            } else {
                setUser("");
                setPass("");
                alert('Registration failed. Please try again.');
            }
            } catch (error) {
                setUser("");
                setPass("");
                alert('An error occurred, please try again later.');
        }
    };


    return (<div>
            <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Username"
                        value = {user}
                        onChange={(event) => {
                            setUser(event.target.value);
                        }}
                />
            </div>
            <div className = 'addMargin'>
                <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Password"
                        type ="password"
                        value = {pass}
                        onChange={(event) => {
                            setPass(event.target.value)
                        }}
                />
            </div>
            <div className = 'addMargin'>
                <Button variant="outlined" onClick = {handleLogin}>
                    Login
                </Button>
                <Button variant="outlined" onClick = {handleRegister}>
                    Register
                </Button>
            </div>

        </div>
    );
}

function LoginScreen(){
    return(
        <div className = "centered">
            <h2>Welcome to the Hardware Manager. Login to Access Projects.</h2>
            <Login/>
        </div>
    )
}


class HardwareSet extends React.Component{
    //don't need when defined as function
    constructor(props){
        super(props)
        this.state = {
            capacity: 100,
            availability: 50,
            checkedOut: 50,
            num: 0,
        }
    }
    handleCheckIn = () => {
        //alert('button clicked')
        var newAvailability = this.state.availability
        if(this.state.availability + parseInt(this.state.num,10) <= this.state.capacity){
            var num = this.state.availability + parseInt(this.state.num,10)
            newAvailability = num
        }
        this.setState({
            availability : newAvailability
        })
    }
    handleCheckOut = () => {
        //alert('button clicked')
        var newAvailability = this.state.availability
        if(this.state.availability - parseInt(this.state.num,10) >= 0){
            var num = this.state.availability - parseInt(this.state.num,10)
            newAvailability = num
        }
        this.setState({
            availability : newAvailability
        })
    }

    render(){
        return <div>
            <Grid container rowSpacing={0}>
                <Grid item xs={6} sm={2}>
                    {this.props.name} Available units: {this.state.availability}/{this.state.capacity}
                </Grid>
                <Grid item xs={6} sm={2}>
                    <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter amount"
                        onChange={(event) => {
                            this.setState({
                                num: event.target.value
                            })
                        }}
                        />
                </Grid>
                <Grid item xs={6} sm={1}>
                    <Button variant="outlined" onClick = {this.handleCheckIn}>
                    Check In
                    </Button>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Button variant="outlined" onClick = {this.handleCheckOut}>
                    Check Out
                    </Button>
                </Grid>
            </Grid>
        </div>
    }
}
class Project extends React.Component{
    render(){
        return (
         <div className="App">
             <h2>{this.props.name}</h2>
             <p>Members: {this.props.members}</p>
             <div className= "increaseMargin">
                <HardwareSet name = "HWSet1"/>
             </div>
             <div className= "increaseMargin">
                 <HardwareSet name = "HWSet2"/>
             </div>
        </div>
        );
    }
}
function ViewProject (){
    const [ProjectID, setProjectID] = useState("");
    const[HWSet1A, setHWSet1A] = useState(0);
    const[HWSet2A, setHWSet2A] = useState(0);
    const[HWSet1C, setHWSet1C] = useState(0);
    const[HWSet2C, setHWSet2C] = useState(0);
    const navigate = useNavigate();

    return (
         <div className="App">
             <h1>Project Manager</h1>
             <h2>Projects You Currently Have Access To: </h2>

             <div class="project">
                 <Project name = "Project 1" members = {"Joe, Steve, Louis"}/>
             </div>
             <Link to= "/">Go Home</Link>
        </div>
    );
}


function ProjectScreen (){
    const location = useLocation();
    const user = location.state?.user;
    console.log(user);
    const[projectID, setProjectID] = useState("");
    const[projectIDJoin, setProjectIDJoin] = useState("");
    const navigate = useNavigate();

    const handleViewProject= async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/getProject", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                    projectID: projectID
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                navigate('/ProjectView');
            } else {
                setProjectID("")
                alert('Sorry, you do not have access to this project.');
            }
            } catch (error) {
                setProjectID("")
                alert('An error occurred, please try again later.');
        }
    }

    const handleAddProject= async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/addProject", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                    projectIDJoin: projectIDJoin
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                console.log(response)
                // navigate('/ProjectView', {state: {"ProjectID": response["ProjectID"], "HWSet1A": response["HWSet1A"], "HWSet2A": response["HWSet2A"], "HWSet1C" : response["HWSet1C"], "HWSet2C" : response["HWSet2C"]}});
                navigate('/ProjectView')
            } else {
                setProjectIDJoin("")
            }
            } catch (error) {
                setProjectIDJoin("")
                alert('An error occurred, please try again later.');
        }
    }

    return (
         <div className="centered">
             <h2>Pick a Project to Access {user}: </h2>
             <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter a ProjectID to View"
                        value = {projectID}
                        onChange={(event) => {
                            setProjectID(event.target.value)
                        }}
                />
            </div>
             <div className = 'addMargin'>
                <Button variant="outlined" onClick = {handleViewProject}>
                    View Project
                </Button>
            </div>
             <h2>Pick a Project to Join and Access: </h2>
             <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter a ProjectID to Join"
                        value = {projectIDJoin}
                        onChange={(event) => {
                            setProjectIDJoin(event.target.value)
                        }}
                />
            </div>
             <div className = 'addMargin'>
                <Button variant="outlined" onClick = {handleAddProject}>
                    View Project
                </Button>
            </div>
        </div>
        );

}

function App(){
    return(
        <Router>
            <div>
                <Routes>
                    <Route path = "/" element={<LoginScreen />} exact/>
                    <Route path = "/Projects" element = {<ProjectScreen />} />
                    <Route path = "/ProjectView" element={<ViewProject />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;

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
    Link,
} from "react-router-dom";
import React from "react";

function useNavigation() {
  let navigate = useNavigate();
  return (path) => {
    navigate(path);
  };
}
function LoginNav(props) {
  let navigate = useNavigation();
  return <Login {...props} navigate={navigate} />;
}

function ProjectsNav(props) {
  let navigate = useNavigation();
  return <ProjectScreen {...props} navigate={navigate} />;
}

function ProjectNav(props) {
  let navigate = useNavigation();
  return <ViewProject {...props} navigate={navigate} />;
}
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: "",
            pass: ""
        }
    }
    handleLogin = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                body: JSON.stringify({
                    username: this.state.user,
                    password: this.state.pass
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                this.props.navigate('/Projects', {state:{"username" :  this.state.user}});
            } else {
                this.setState({
                    user: "",
                    pass:""
                })
                alert('Login failed: Incorrect username or password. Please try again.');
            }
            } catch (error) {
                this.setState({
                    user: "",
                    pass:""
                })
                alert('An error occurred, please try again later.');
        }
    }
    render(){
        return <div>
            <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Username"
                        value = {this.state.user}
                        onChange={(event) => {
                            this.setState({
                                user: event.target.value
                            })
                        }}
                />
            </div>
            <div className = 'addMargin'>
                <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Password"
                        value = {this.state.pass}
                        onChange={(event) => {
                            this.setState({
                                pass: event.target.value
                            })
                        }}
                />
            </div>
            <div className = 'addMargin'>
                <Button variant="outlined" onClick = {this.handleLogin}>
                    Login
                </Button>
            </div>

        </div>
    }

}

function LoginScreen(){
    return(
        <div className = "centered">
            <h2>Welcome to the Hardware Manager. Login Access Projects.</h2>
            <LoginNav/>
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
             <div class= "increaseMargin">
                <HardwareSet name = "HWSet1"/>
             </div>
             <div class= "increaseMargin">
                 <HardwareSet name = "HWSet2"/>
             </div>
        </div>
        );
    }
}

class ViewProject extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ProjectID:"",
            HWSet1A:"",
            HWSet2A:"",
            HWSet1C:"",
            HWSet2C:""
        }
    }
    render(){
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
}


class ProjectScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            projectID: "",
            projectIDJoin: ""
        }
    }
    handleViewProject= async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/getProject", {
                method: "POST",
                body: JSON.stringify({
                    projectID: this.state.projectID,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                this.props.navigate('/ProjectView');
            } else {
                this.setState({
                    projectID: "",
                })
                alert('Sorry, you do not have access to this project.');
            }
            } catch (error) {
                this.setState({
                    projectID: "",
                })
                alert('An error occurred, please try again later.');
        }
    }

    handleAddProject= async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/addProject", {
                method: "POST",
                body: JSON.stringify({
                    projectIDJoin: this.state.projectIDJoin,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                console.log(response)
                this.props.navigate('/ProjectView', {state: {"ProjectID": response["ProjectID"], "HWSet1A": response["HWSet1A"], "HWSet2A": response["HWSet2A"], "HWSet1C" : response["HWSet1C"], "HWSet2C" : response["HWSet2C"]}});
            } else {
                this.setState({
                    projectIDJoin: "",
                })
            }
            } catch (error) {
                this.setState({
                    projectIDJoin: "",
                })
                alert('An error occurred, please try again later.');
        }
    }


    render(){
         return (
         <div className="centered">
             <h2>Pick a Project to Access: </h2>
             <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter a ProjectID to View"
                        value = {this.state.projectID}
                        onChange={(event) => {
                            this.setState({
                                projectID: event.target.value
                            })
                        }}
                />
            </div>
             <div className = 'addMargin'>
                <Button variant="outlined" onClick = {this.handleViewProject}>
                    View Project
                </Button>
            </div>
             <h2>Pick a Project to Join and Access: </h2>
             <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter a ProjectID to Join"
                        value = {this.state.projectIDJoin}
                        onChange={(event) => {
                            this.setState({
                                projectIDJoin: event.target.value
                            })
                        }}
                />
            </div>
             <div className = 'addMargin'>
                <Button variant="outlined" onClick = {this.handleAddProject}>
                    View Project
                </Button>
            </div>
        </div>
        );
    }

}

function App(){
    return(
        <Router>
            <div>
                <Routes>
                    <Route path = "/" element={<LoginScreen />} exact/>
                    <Route path = "/Projects" element = {<ProjectsNav />} />
                    <Route path = "/ProjectView" element={<ProjectNav />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;

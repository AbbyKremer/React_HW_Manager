import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";

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

export default ViewProject;
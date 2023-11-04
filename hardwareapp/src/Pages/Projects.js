import logo from './logo.svg';
import '../../src/App.css';
import React from 'react'
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';

//if a function you only have to return, not render
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
    constructor(props){
        super(props)
        this.state = {
            buttonText: "Join"
        }
    }

    handleJoin = () => {
        let newText =""
        if(this.state.buttonText === "Join"){
            newText = "Leave"
        }
        else{
            newText = "Join"
        }
        this.setState({
            buttonText: newText
        })
    }
    render(){
        return (
         <div className="App">
             <h2>{this.props.name}</h2>
             <p>Members: {this.props.members}</p>
             <div class="increaseMargin">
                 <Button variant="outlined" onClick={this.handleJoin}>
                        {this.state.buttonText}
                 </Button>
             </div>
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

function App() {
  return (
         <div className="App">
             <h1>Project Manager</h1>
             <div class="project">
                 <Project name = "Project 1" members = {"Joe, Steve, Louis"}/>
             </div>
            <div class="project">
                <Project name = "Project 2" members= {"Jane, Ken"} />
            </div>
             <div className="project">
                 <Project name="Project 3" members={"Bob, Carrie"}/>
             </div>

        </div>
  );
}

export default App;

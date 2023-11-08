import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState, useRef} from "react";

const HardwareSet = (props) =>{
    const[capacity, setCapacity] = useState(props.capacity)
    const[availability, setAvailability] = useState(props.availability)
    const[checkedOut, setCheckedOut] = useState(props.checkedOut)
    const[num, setNum] = useState('')

    const numRef = useRef();
    console.log(numRef)
    const handleCheckIn = async(event) => {
        event.preventDefault();
        const numCheck = numRef.current.value;
        console.log(numCheck);
        try {
            const response = await fetch("http://localhost:5000/checkIn", {
                method: "POST",
                body: JSON.stringify({
                    projectID : props.projectID,
                    num: numCheck,
                    HWSet: props.name
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setAvailability(response.get("availability"))
            } else {
                setNum("")
                alert('That many items does not exist. Please check in the correct number.')
            }
            } catch (error) {
                setNum("")
                alert('An error occurred, please try again later.');
        }
    }
    const handleCheckOut = async(event) => {
        event.preventDefault();
        const numCheck = numRef.current.value;
        console.log(numCheck);
        try {
            const response = await fetch("http://localhost:5000/checkOut", {
                method: "POST",
                body: JSON.stringify({
                    projectID : props.projectID,
                    num: numCheck,
                    HWSet: props.name
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                setAvailability(response.get("availability"))
                alert('You successfully checked out ' + numCheck + ' items')
            } else {
                setNum("")
                alert('You do not have enough hardware to check out ' + numCheck + ' items')
            }
            } catch (error) {
                setNum("")
                alert('An error occurred, please try again later.');
        }
    }

    return(
        <div>
            <Grid container rowSpacing={0}>
                <Grid item xs={6} sm={2}>
                    {props.name} Available units: {availability}/{capacity}
                </Grid>
                <Grid item xs={6} sm={2}>
                    <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter amount"
                        inputRef={numRef}
                        onChange={(event) => {
                            setNum(event.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={1}>
                    <Button variant="outlined" onClick = {handleCheckIn}>
                    Check In
                    </Button>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Button variant="outlined" onClick = {handleCheckOut}>
                    Check Out
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
const Project = (props) =>{
        return (
         <div className="App">
             <h2>{props.name}</h2>
             <div className= "increaseMargin">
                <HardwareSet name = "HWSet1" capacity = {props.HW1C} availability = {props.HW1A} checkedOut = {props.CheckOut1}/>
             </div>
             <div className= "increaseMargin">
                 <HardwareSet name = "HWSet2" capacity = {props.HW2C} availability = {props.HW2A} checkedOut = {props.CheckOut2}/>
             </div>
        </div>
        );
}

function ViewProject (){
    const location = useLocation();
    const ProjectID = location.state?.ProjectID;
    const CheckedOut1 = location.state?.CheckedOut1;
    const CheckedOut2 = location.state?.CheckedOut2;
    const Description = location.state?.Description;
    const HWSet1A = location.state?.HWSet1A;
    const HWSet2A = location.state?.HWSet1A;
    const HWSet1C = location.state?.HWSet1C;
    const HWSet2C = location.state?.HWSet1C;

    const navigate = useNavigate();


    return (
         <div className="App">
             <h1>Project Manager</h1>
             <h2>You are currently viewing {ProjectID} </h2>
             <p>Project Description: {Description}</p>
             <div className="project">
                 <Project name = {ProjectID} HW1A = {HWSet1A} HW1C = {HWSet1C} HW2A = {HWSet2A} HW2C = {HWSet2C} CheckOut1 = {CheckedOut1} CheckOut2 = {CheckedOut2}/>
             </div>
             <div>
                <Link to= "/Projects">Project Selection</Link>
             </div>
             <div>
                <Link to= "/">Logout</Link>
             </div>
        </div>
    );
}

export default ViewProject;
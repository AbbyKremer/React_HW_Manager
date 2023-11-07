import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";

const HardwareSet = (props) =>{
    const[capacity, setCapacity] = useState(props.capacity)
    const[availability, setAvailability] = useState(props.availability)
    const[num, setNum] = useState(0)

    const handleCheckIn = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/checkIn", {
                method: "POST",
                body: JSON.stringify({
                    projectID : props.projectID,
                    num: parseInt(num),
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
        try {
            const response = await fetch("http://localhost:5000/checkOut", {
                method: "POST",
                body: JSON.stringify({
                    projectID : props.projectID,
                    num: parseInt(num)
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setAvailability(response.get("availability"))
            } else {
                setNum("")
                alert('You do not have enough hardware to check out' + num + 'items')
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
                <HardwareSet name = "HWSet1" projectID = {props.name} capacity = {props.HW1C} availability = {props.HW1A}/>
             </div>
             <div className= "increaseMargin">
                 <HardwareSet name = "HWSet2" capacity = {props.HW2C} availability = {props.HW2A}/>
             </div>
        </div>
        );
}
function ViewProject (){
    const location = useLocation();
    const ProjectID = location.state?.ProjectID;
    const HWSet1C = location.state?.HWSet1C;
    const HWSet2C = location.state?.HWSet2C;
    const[HWSet1A, setHWSet1A] = useState(location.state?.HWSet1A)
    const[HWSet2A, setHWSet2A] = useState(location.state?.HWSet1A)

    const navigate = useNavigate();

    return (
         <div className="App">
             <h1>Project Manager</h1>
             <h2>{ProjectID} </h2>

             <div className="project">
                 <Project name = {ProjectID} HW1C = {HWSet1C} HW2C = {HWSet2C} HW1A = {HWSet1A} HW2A = {HWSet2A}/>
             </div>
             <Link to= "/">Go Home</Link>
        </div>
    );
}

export default ViewProject;
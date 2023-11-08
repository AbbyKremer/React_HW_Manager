import {Link, useLocation, useNavigate} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import React, {useState} from "react";

function ProjectScreen (){
    const location = useLocation();
    const user = location.state?.user;
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
            if (response.status == 200) {
                const data = await response.json()
                navigate('/ProjectView', {
                    state: {
                        ProjectID: projectID,
                        HWSet1C: parseInt(data.HWSet1C),
                        HWSet2C: parseInt(data.HWSet2C),
                        HWSet1A: parseInt(data.HWSet1A),
                        HWSet2A: parseInt(data.HWSet2A)
                    }
                })

            } else {
                setProjectID("")
                alert('Sorry, you do not have access to this project.');
            }
        }
        catch (error) {
                setProjectID("")
                alert('An error occurred, please try again later.');
        }
    }

    const handleAddProject= async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/joinProject", {
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
                alert('You were successfully added to ' + projectIDJoin)
                setProjectIDJoin("")
            } else{
                setProjectIDJoin("")
                alert('You have already joined this project.')
            }
            } catch (error) {
                setProjectIDJoin("")
                alert('An error occurred, please try again later.');
        }
    }

    return (
         <div className="centered">
             <h2>Welcome, {user}!</h2>
             <h2>Pick a Project to Access: </h2>
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
             <h2>Join a New Project: </h2>
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
                    Join
                </Button>
            </div>
             <div className = "centerText">
                 <Link to={{pathname: "/CreateProject", state: {"user" :  user}}}>
                    Create a new Project
                    </Link>
             </div>
             <div className = "centerText">
                 <Link to= "/">Logout</Link>
             </div>

        </div>
        );

}

export default ProjectScreen;
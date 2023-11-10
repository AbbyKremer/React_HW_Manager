import {Link, useLocation, useNavigate} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useState} from "react";

function ProjectScreen (){
    const location = useLocation();
    const user = location.state?.user;
    const[projectID, setProjectID] = useState("");
    const[projectIDJoin, setProjectIDJoin] = useState("");
    const[capacity1, setCapacity1] = useState("");
    const[availability1, setAvailability1] = useState("");
    const[capacity2, setCapacity2] = useState("");
    const[availability2, setAvailability2] = useState("");
    const[checkedOut1, setCheckedOut1] = useState("");
    const[checkedOut2, setCheckedOut2] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
      };

    const handleViewProject= async(event) => {
        event.preventDefault();
        if(projectID == ""){
            alert("Please enter a ProjectID")
        }
        else{
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
                        user:user,
                        ProjectID: data.ProjectID,
                        CheckedOut1: data.CheckedOut1,
                        CheckedOut2: data.CheckedOut2,
                        Description: data.Description,
                        HWSet1A: data.HWSet1A,
                        HWSet2A: data.HWSet2A,
                        HWSet1C: data.HWSet1C,
                        HWSet2C: data.HWSet2C

                    }
                })

            } else {
                setProjectID("")
                alert(response.message);
                }
            }
            catch (error) {
                setProjectID("")
                alert('An error occurred, please try again later.');
            }
        }
    }

    const handleAddProject= async(event) => {
        event.preventDefault();
        if(projectID == ""){
            alert("Please enter a ProjectID")
        }
        else{
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
    }

    const handleCreateProject = async(event) => {
        event.preventDefault();
        navigate('/CreateProject', {state:{"user":user}});
    }
    
    const handleLogout = async(event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div>
            <div className="back-arrow" onClick={handleGoBack}>
                    <ArrowBackIcon />
            </div>
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
                <div className = 'addMargin'>
                    <Button variant="outlined" onClick = {handleCreateProject}>
                        Create a New Project
                    </Button>
                </div>
                <div className = 'addMargin'>
                    <Button variant="outlined" onClick = {handleLogout}>
                        Logout
                    </Button>
                </div>

            </div>
        </div>
        );

}

export default ProjectScreen;
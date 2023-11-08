import {Link, useLocation, useNavigate} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import React, {useState} from "react";

function CreateProject (){
 const location = useLocation();
    const user = location.state?.user;
    const[projectID, setProjectID] = useState("");
    const[projectDescription, setProjectDescription] = useState("");
    const navigate = useNavigate();

    const handleCreateProject= async(event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/getProject", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                    projectID: projectID,
                    description: projectDescription
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
                alert('This project already exists'); //maybe? but might be allowing same name so idk
            }
        }
        catch (error) {
                setProjectID("")
                alert('An error occurred, please try again later.');
        }
    }


    return (
         <div className="centered">
             <h2>Welcome, {user}!</h2>
             <h2>Create a New Project: </h2>
             <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter a Project Name"
                        value = {projectID}
                        onChange={(event) => {
                            setProjectID(event.target.value)
                        }}
                />
            </div>
            <div className = 'addMargin'>
               <OutlinedInput
                        size="small"
                        id="component-outlined"
                        placeholder = "Enter a Project Description"
                        value = {projectDescription}
                        onChange={(event) => {
                            setProjectDescription(event.target.value)
                        }}
                />
            </div>
             <div className = 'addMargin'>
                <Button variant="outlined" onClick = {handleCreateProject}>
                    Create Project
                </Button>
            </div>


        </div>
        );

}

export default CreateProject;
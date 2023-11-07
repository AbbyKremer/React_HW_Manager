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
                navigate('/ProjectView', {
                    state: {
                        ProjectID: projectID,
                        HWSet1C: response["HWSet1C"],
                        HWSet2C: response["HWSet2C"],
                        HWSet1A: response["HWSet1A"],
                        HWSet2A: response["HWSet2A"],
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
                // navigate('/ProjectView', {state: {"ProjectID": response["ProjectID"], "HWSet1A": response["HWSet1A"], "HWSet2A": response["HWSet2A"], "HWSet1C" : response["HWSet1C"], "HWSet2C" : response["HWSet2C"]}});
                navigate('/ProjectView', {state: response})
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
             <div className = "centerText">
                 <Link to= "/CreateProject">Create a New Project</Link>
             </div>

        </div>
        );

}

export default ProjectScreen;
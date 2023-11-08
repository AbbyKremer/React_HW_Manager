import {Link, useLocation, useNavigate} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useState} from "react";

function Create (){
const [user, setUser] = useState("");
    const[pass, setPass] = useState("");
    const[answer, setAnswer] = useState("");
    const navigate = useNavigate();

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
                alert('Unique username Required. Please try again.');
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
                <Button variant="outlined" onClick = {handleRegister}>
                    Register
                </Button>
            </div>
        </div>
    );
}

function CreateAccount (){
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
      };
    return(
        <div>
            <div className="back-arrow" onClick={handleGoBack}>
                <ArrowBackIcon />
            </div>
            <div className = "centered">
                <h2>Create Your Account Here.</h2>
                <Create/>
                <div className = "centerText">
                    <Link to= "/">Return to login</Link>
                </div>
            </div>
        </div>
    )
}


export default CreateAccount;
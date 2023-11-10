import {Link, useNavigate} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useState} from "react";

function Login (){
    const [user, setUser] = useState("");
    const[pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(event) => {
        event.preventDefault();
        if(user == ""){
            alert("Please enter a username")
        }
        else if(pass == ""){
            alert("Please enter a password")
        }
        else{
            try {
            const response = await fetch("http://localhost:5000/login", {
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
                navigate('/Projects', {state:{"user":user}});
            } else {
                setUser("");
                setPass("");
                alert('Login failed: Incorrect username or password. Please try again.');
            }
            } catch (error) {
                setUser("");
                setPass("");
                alert('An error occurred, please try again later.');
            }
        }

    };
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
                alert('Registration failed. Please try again.');
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
                <Button variant="outlined" onClick = {handleLogin}>
                    Login
                </Button>
            </div>
        </div>
    );
}

function LoginScreen(){

    const handleCreateAccount = async(event) => {
        event.preventDefault();
        navigate('/CreateAccount');
    }

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
      };

    return(
        <div>
            <div className = "centered">
                <h2>Welcome to the Hardware Manager. Login to Access Projects.</h2>
                <Login/>
                <div className = 'addMargin'>
                    <Button variant="outlined" onClick = {handleCreateAccount}>
                        Create a New Account
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
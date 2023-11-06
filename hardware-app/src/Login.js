import {Link, useNavigate} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import React, {useState} from "react";

function Login (){
    const [user, setUser] = useState("");
    const[pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(event) => {
        event.preventDefault();
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
    return(
        <div className = "centered">
            <h2>Welcome to the Hardware Manager. Login to Access Projects.</h2>
            <Login/>
            <div className = "centerText">
                <Link to= "/CreateAccount">Create a New Account</Link>
            </div>
        </div>
    )
}

export default LoginScreen;
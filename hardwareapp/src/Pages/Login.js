import React, { useState } from "react";
//import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./styles.css";


function Login() {

let navigate = useNavigate();
  const routeChange = (path) =>{
    navigate(path);
  }
// React States
// const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setIsSubmitted(true);
        routeChange("/projects") //login correct: go to project page (will prob add username to this url so show correct page)
      } else {
        // Handle login failure
        //make some sort of wrong username/password 
      }
    } catch (error) {
      // Handle network or other errors
    }
  }

  const handleClick = (event) => {
    event.preventDefault();

  }
  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
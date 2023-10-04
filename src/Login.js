import { useState } from "react";


const Login = () => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [info, setInfo] = useState({ username: "", password: "" });
    const clickHandler = () => {
        setUser(info.username)
        setPass(info.password)
    };

    const inputHandler = (e,prop) => {
        setInfo({
            ...info, [prop]:e.target.value
        });
    };

    return (
        <div>
          <center>
            <h3>Login</h3>
            <input
              type="text"
              placeholder="Username"
              value = {info.username}
              onChange = {(e) => inputHandler (e, "username")}
            ></input>
            <br></br>
            <input
              type="password"
              placeholder="Password"
              value = {info.password}
              onChange = {(e) => inputHandler (e, "password")}
            ></input>
            <br></br>
            <button onClick={clickHandler}>Login</button>
            <h1>
                {user}
            </h1><h1>
              {pass}
            </h1>
          </center>
        </div>
      );
    };


export default Login;
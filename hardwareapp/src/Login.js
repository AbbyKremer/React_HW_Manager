import React, { useState } from 'react';

function Login(){
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [message, setMessage] = useState('');

 const handleLogin = () => {
    if (username === 'test' && password === 'test') {
      setMessage('Login successful');
    } else {
      setMessage('Login failed. Please check your username and password.');
    }
  };


    return(
    <div>
      <h2>Login</h2>
        <p>
          Login to the site
        </p>
        <label>
        Username:
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         </label>
         <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </label>
        <button type="button" onClick={handleLogin}>
        Login
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
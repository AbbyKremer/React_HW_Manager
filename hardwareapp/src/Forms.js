// In this example, the Welcome component takes a name prop and displays a greeting with the name.
// The App component uses the Welcome component multiple times, passing a different name prop each time.
// Props can be of any type, such as numbers, strings, arrays, or objects. 
// You can also use React's PropTypes library to define the type of props that a component should receive.


import React, { useState } from 'react';
import './Form.css';
import logo from './yctw9r01.svg';

function Form() {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword]=useState('');
  const [output, setOutput]=useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handlePasswordChange= (event) => {
    setPassword(event.target.value);
  }

  const clickHandler = () => {
    setInputValue("");
    setPassword("");
    setOutput(inputValue+" "+password);
  };

  return(
    <div className="Form">
      <header className="Form-header">
      <center>
      <form>
      <img src={logo} className="Form-logo" alt="logo" />
      </form>
      <form>
        <label>
          Username: 
          <input type="text" value={inputValue} onChange={handleInputChange}/>
          
        </label>
        
      </form>

      <form>
        <label>
          Password: 
          <input type="text" value={password} onChange={handlePasswordChange}/>
          
        </label>
        
      </form>

      <br></br>
        <button onClick={clickHandler}>Login</button>

        
        <p>Your output is: {output}</p>

      </center>
      </header>
    </div>
  )
}

export default Form;

  
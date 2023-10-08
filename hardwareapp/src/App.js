import React from 'react';
import Forms from './Forms';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Remove the default logo and text */}
        <Forms /> {/* Render the Login component */}
      </header>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
//import './App.css';

class HardwareSet extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            capacity: 101,
            availability: 50,
            checkedOut: 50
        }
    }

    handleClick = () => {
        var newAvailability = this.state.availability + 1
        this.setState({
            availability: newAvailability
        })
    }

    render() {
        return (
            <div>
                This is a {this.props.name} component. {this.state.availability}/{this.state.capacity}
                <button onClick={this.handleClick}> + </button>
            </div>
        )
    }
}

class Project extends React.Component {

}

function App1() {
   return (
    <div className = "App">
        <HardwareSet name="HWSet 1"/>
        <HardwareSet name="HWSet 2"/>
        <HardwareSet name="HWSet 3"/>
    </div>
   );
}

export default App1;